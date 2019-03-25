const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const mysql = require("mysql");
const knex = require('knex');
const readline = require('readline');
const Promise = require('bluebird');

exports.handler = (event, context, callback) => {

    const orgId = 2400;
    const parentId = 5696;
    let groupTable = [];

    let { host, database, user, password } = process.env;

    host = 'ideadrop-staging.c4vngee5eszq.eu-west-1.rds.amazonaws.com';
    database = 'ideadrop_staging';
    user = 'root';
    password = 'Connect99';

    const dbConnection = knex({
        client: 'mysql',
        connection: {
            host,
            database,
            user,
            password
        }
    });

    const getGroupTable = async (parentId) => {
        try {

            const query = `select name, id from groups where parent_id = ${parentId}`;
            const row = await dbConnection.raw(query);


            console.log('row: ', row[0][0].name);

            let cos = JSON.parse(JSON.stringify(row[0]));
            console.log('cos: ', cos[1].name);


            cos.forEach(function (entry) {
                groupTable[entry.name] = entry.id
                //console.log(entry.name);
            });


            console.log('groupTable: ', groupTable);
            // const data = JSON.parse(row[0]);

            dbConnection.destroy();
            return groupTable;

        } catch (error) {

            console.log(`error:`, error);
            // Destroy the connection before returning
            dbConnection.destroy();
            // Default the badgeCount to 0 if any error happens

        }
    };

    try {

        // Najpier uruchom getGroupTable a pozniej zrob .then(readStream());
        // Wiec musisz ten getGroupTable zrobic jako promis 
        // getGroupTable(parentId)
        // .then(function(result){
        //     // Now you can call 
        //      readStream()
        // })
        // .catch(function(error){
        //     // Handle error
        // });

        let groupTableHere = getGroupTable(parentId);
        console.log('groupTableHere --- : ', groupTableHere.Ericsson);

    } catch (e) {
        console.log('our error: ', e);
    }





    const processLine = line => {

        let res = line.split(";");

        console.log(res[0]);


        // return taka linie w postaci json
        // {org_id: orgId, mapping_key:'costam', group_id: 6027}

        // czyli musisz zajrzec do bazy danych i sprawdzic jaki numer ma MNEA


        // if empty table 
        // zrob import calosci
        // bulk batch insert

        // wiec musisz zrobic batch (paczke)


        // i insert jako transakcje



        // take line
        // check if mapping_key (email) exists in database
        // if exists
        //      remove
        //      add insert
        // if desn't exist 
        //      add insert
        // albo zrob batch update
        // https://stackoverflow.com/questions/40543668/batch-update-in-knex

    }

    let lineCounter = 0;
    let batch = [];

    const readStream = async () => {
        const params = {
            Bucket: 'production-ericsson-idd',
            Key: 'test.csv'
        }
        const rl = readline.createInterface({
            input: s3.getObject(params).createReadStream(),
            crlfDelay: Infinity
        });
        rl.on('line', (line) => {

            processLine(line);


            // lineCounter++;            
            // // wiec musisz zrobic batch (paczke)
            // if(lineCounter < 10){
            //     batch.push({org_id: orgId, mapping_key:'costam'});       
            // }

            // if(lineCounter == 10) {
            //     // insert batch
            //     console.log('batch: ',batch);
            //     lineCounter = 0;
            //     batch = [];
            // }


        }).on('close', function () {

        });
        return 99;
    }

    try {
        let cos = readStream();
        console.log('cos: ', cos);

    } catch (e) {
        console.log('our error: ', e);
    }


    // const getData = async (id) => {
    //     try {

    //         const query = `select id, org_id, mapping_key, group_id from group_mapping where id = ${id}`;
    //         const row = await dbConnection.raw(query);
    //         console.log('getData: ',JSON.stringify(row[0]));

    //         // const data = JSON.parse(row[0]);
    //         dbConnection.destroy();

    //         return 1;

    //     } catch (error) {

    //         console.log(`error:`, error);
    //         // Destroy the connection before returning
    //         dbConnection.destroy();
    //         // Default the badgeCount to 0 if any error happens
    //         return 0;
    //     }
    // };


    // try {
    //     getData(236322);
    // } catch (e) {
    //     console.log('our error: ', e);
    // }

};

