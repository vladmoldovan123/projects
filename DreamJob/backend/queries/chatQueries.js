const database = require("../database/database");
const constants = require("../utils/constants");
const {MongoClient} = require("mongodb");

exports.findConversationsByUserId = function(id,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({user: id}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.findConversationsByBusinessId = function(id,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({business: id}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}