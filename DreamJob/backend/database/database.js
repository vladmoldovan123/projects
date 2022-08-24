const {MongoClient} = require('mongodb');
const constants = require("../utils/constants");


exports.insert = function(key, doc, collection) {
    return new Promise((resolve, reject) => {
        if (!doc) {
            reject(new Error("Document cannot be null"));
        } else {

            const client = new MongoClient(constants.uriDatabase);

            client.connect(function (err, db) {
                if (err) {
                    reject(err);
                }
                const dbo = db.db(constants.databaseName);

                dbo.collection(collection).updateOne({ _id: key }, { $set: doc }, { upsert: true }, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                    db.close();
                })
            });
        }
    });
}

exports.updateDocumentByQuery = function(query, doc, collection) {
    return new Promise((resolve, reject) => {
        if (!doc) {
            reject(new Error("Document cannot be null"));
        } else {

            const client = new MongoClient(constants.uriDatabase);

            client.connect(function (err, db) {
                if (err) {
                    reject(err);
                }
                const dbo = db.db(constants.databaseName);

                dbo.collection(collection).updateOne(query, { $set: doc }, { upsert: false }, function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                    db.close();
                })
            });
        }
    });
}

exports.findDocumentByQuery = function(query, collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).findOne(query, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.getDocumentById = function (id,collection){
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).findOne({ _id: id }, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            });
        });
    });
}

exports.findAll = function(collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.dropDatabase = function () {
    return new Promise((resolve, reject) => {

        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);
            dbo.dropDatabase()
                .then(ok => {
                    resolve(ok);
                    db.close();
                })
                .catch(err => {
                    reject(err);
                    db.close();
                });
        });
    });
}

