const AWS = require('aws-sdk');
const knex = require('knex');
const documentClient = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

/*
  TODO: We should make use of lambda layers to separate dependencies
  (node_modules) to improve performance
  
  TODO: Separate getUnseenNotifications() into its own Lamdba function, this can turn
  into unseenNotifications() Lambda function which can also be used as an endpoint
  
  TODO: Separate getRegisteredUser() into its own Lambda function
*/

const response = (statusCode, body, callback) => callback(null, { statusCode, body: JSON.stringify(body) });

const createPayloadByPlatform = (device, text, user, badgeCount, callback) => {
    const { platform } = device;
    let payload = {};

    if (platform === 'android') {
        payload = { GCM: JSON.stringify({ data: { message: text } }) };
    } else {
        const mode = platform === 'ios' ? 'APNS' : 'APNS_SANDBOX';
        payload = {
            [mode]: JSON.stringify({
                aps: {
                    'alert': text,
                    'badge': badgeCount,
                    'sound': 'default'
                }
            })
        };
    }

    const result = { default: text, ...payload };
    return JSON.stringify(result);
};

const pushToDevice = (device, payload) => {
    sns.getEndpointAttributes({
        EndpointArn: device.endpointArn
    }, (err, endpoint) => {
        // If the endpoint is disabled
        if (err) {
            console.log('SNS Get endpoint attributes error: ', err);
            return;
        }

        if (!endpoint.Attributes.Enabled) {
            console.log('SNS Get endpoint attributes might be disabled. Endpoint info: ', endpoint);
            return;
        }

        sns.publish({
            Message: payload,
            MessageStructure: 'json',
            TargetArn: device.endpointArn
        }, (error, data) => {
            if (!error) {
                console.log('SNS Publish data: ', data);
            } else {
                console.log('There was a problem sending a notification to device: ', device);
                console.log('SNS Publish error data: ', data);
                console.log('SNS Publish error: ', error);
            }
        });
    });
};

const getUnseenNotifications = async userId => {
    const { host, user, password, database } = process.env;

    const dbConnection = knex({ client: 'mysql', connection: { host, user, password, database } });

    const lastSeenQuery = `select notification_seen from users where id = ${userId}`;

    try {
        const row = await dbConnection.raw(lastSeenQuery);

        const lastSeen = JSON.parse(row[0][0].notification_seen);

        /*
          "lastSeen" returns a { key: value } of either
          a number e.g: { "563": 618891 }
          or a string e.g: { "563": '618891' }
          based on the MySQL query result.
          
          If it's a string, the key of that row is unknown to us, which is why we
          use Object.values to get its value without knowing the key.
        */
        const notificationSeen = lastSeen === 'number' ? lastSeen : Object.values(lastSeen)[0];

        const badgeCountQuery = `
      select count(*) as badgeCount from notifications left 
      join profiles on profiles.user_id = notifications.user_id 
      where notifications.org_id = (select group_id from role_user where user_id = ${userId} order by group_id asc limit 1) 
      and notifications.read = 0 
      and notifications.id > ${notificationSeen} 
      and author_id = ${userId} 
      and notifications.verb != 'postedIdea' 
      order by notifications.id desc
    `;

        const badgeCountResult = await dbConnection.raw(badgeCountQuery);
        const { badgeCount } = badgeCountResult[0][0];

        // Destroy the connection before returning
        dbConnection.destroy();

        return badgeCount;

    } catch (error) {
        console.log(`getUnseenNotifications(${userId}) error:`, error);

        // Destroy the connection before returning
        dbConnection.destroy();

        // Default the badgeCount to 0 if any error happens
        return 0;
    }
};

const getRegisteredUser = userId => {
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: { id: parseFloat(userId, 10) }
    };

    return new Promise((resolve, reject) => {
        documentClient.get(params, (error, data) => {
            if (error) {
                console.log(`getRegisteredUser(${userId}) error: `, error);
                reject(error);
            } else if (!data.Item) {
                // User not found
                resolve([]);
            } else {
                // User found
                resolve(data.Item.arns);
            }
        });
    });
};

const sendNotification = async (id, text, callback) => {
    try {
        const badgeCount = await getUnseenNotifications(id);
        const user = await getRegisteredUser(id);

        if (user.length) {
            await user.forEach(device => {
                const payload = createPayloadByPlatform(device, text, user, badgeCount, callback);
                pushToDevice(device, payload);
            });

            return response(200, { message: `sendNotification(${id}) successfully sent to ${user.length} device(s).` }, callback);
        } else {
            return response(204, { message: `User ${id} is not registered for notifications. No notifications sent.` }, callback);
        }
    } catch (e) {
        response(400, { message: `User ${id} is not registered to Idea Drop.` }, callback);
    }
};

exports.handler = (event, context, callback) => {
    try {
        const body = JSON.parse(event.body);
        const { id, notification: text } = body;
        sendNotification(id, text, callback);
    } catch (error) {
        console.log('Send Notification export handler error:', error);
        response(400, { message: 'Bad Request: Body could not be parsed. Error:', error }, callback);
    }
};

