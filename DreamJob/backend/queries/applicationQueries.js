const database = require("../database/database");
const constants = require("../utils/constants");
const {MongoClient} = require("mongodb");

exports.findApplicationsByJob = function(jobId,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({job: jobId}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.findApplicationsByUser = function(userId,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({user: userId}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}