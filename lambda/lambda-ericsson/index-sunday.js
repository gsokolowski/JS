const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const mysql = require("mysql");
const readline = require('readline');
const Promise = require('bluebird');

exports.handler = (event, context, callback) => {

    const orgId = 2400;
    const parentId = 5696;

    let groupTable = [];
    let lineCounter = 0;
    let batch = [];

    let { host, database, user, password } = process.env;


    var knex = require('knex')({
        client: 'mysql',
        connection: {
            host,
            database,
            user,
            password
        },
        useNullAsDefault: true
    });

    // batch = [
    //     {org_id: 1, mapping_key:'mapping_key', group_id: 33}
    // ];

    // knex('test').insert(batch).then(() => console.log("data inserted"))
    //     .catch((err) => { console.log(err); throw err })
    //     .finally(() => {
    //         knex.destroy();
    //     });


    const getGroupTable = async (parentId) => {

        try {

            const query = `select name, id from groups where parent_id = ${parentId}`;
            const row = await knex.raw(query);
            console.log('row: ', row[0][0].name);

            let cos = JSON.parse(JSON.stringify(row[0]));
            console.log('cos: ', cos[1].name);

            cos.forEach(function (entry) {
                groupTable[entry.name] = entry.id
                //console.log(entry.name);
            });

            console.log('groupTable from inside getGroupTable: ', groupTable);
            // const data = JSON.parse(row[0]);

            knex.destroy();


        } catch (error) {
            // Destroy the connection before returning
            knex.destroy();
        }
        return groupTable;
    };


    const processLine = line => {
        let lineBits = line.split(";");
        return lineBits;
    }

    const fireBulkInsert = (batch, pointer) => {
        try {
            // const query = `select name, id from groups where parent_id = ${parentId}`;
            // const row = await dbConnection.raw(query);
            console.log(`bulkInsert - ${pointer}`, batch)


            batch = [
                { org_id: 1, mapping_key: 'mapping_key 123', group_id: 33 }
            ];

            knex('test').insert(batch).then(() => console.log("data inserted"))
                .catch((err) => { console.log(err); throw err })
                .finally(() => {
                    knex.destroy();
                });

            //INSERT INTO test (org_id,mapping_key,group_id,created_at, updated_at) VALUES (1,'abc',3,NOW(),NOW()),(1,'sdasdabc',4,NOW(),NOW()),(1,'dsaabc',3,NOW(),NOW());
            // const query = `INSERT INTO test (org_id,mapping_key,group_id) VALUES (1,'abc',3,NOW(),NOW()),(1,'sdasdabc',4,NOW(),NOW()),(1,'dsaabc',3,NOW(),NOW())`;
            // knex.raw(query);

            knex.destroy();
        } catch (error) {
            console.log('error: ', error)
        }
    }


    const readStream = async () => {
        // wait till this getGrouTable function gets data 
        // before you continue in this readStreem function


        const groupTable = await getGroupTable(parentId);
        // console.log('groupTable from inside readStream: ', groupTable);
        // console.log('groupID ',groupTable['Business Services']);


        const params = {
            Bucket: 'production-ericsson-idd',
            Key: 'test.csv'
        }

        const rl = readline.createInterface({
            input: s3.getObject(params).createReadStream(),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {

            let lineBits = processLine(line);
            //console.log('lineBits: ',lineBits[0]);

            // batch.push(
            //     { org_id:orgId , mapping_key:lineBits[0] , group_id: groupTable[lineBits[1]] }
            // ) 


        }).on('close', function () {

        });

        batch = [
            { org_id: 1, mapping_key: 'xix 3232', group_id: 233 },
            { org_id: 1, mapping_key: 'g das', group_id: 133 }
        ];

        return batch;
    }


    const init = async () => {

        batch = await readStream();

        // batch = [
        //     {org_id: 1, mapping_key:'ey 3232', group_id: 233},
        //     {org_id: 1, mapping_key:'mappidasdsas', group_id: 133}
        // ];

        console.log('batch: ', batch);

        await knex('test').insert(batch).then(() => console.log("data inserted"))
            .catch((err) => { console.log(err); throw err })
            .finally(() => {
                knex.destroy();
            });
    }



    init();

};

