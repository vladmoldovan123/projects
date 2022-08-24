const database = require("../database/database");
const constants = require("../utils/constants");
const {MongoClient} = require("mongodb");

exports.findUserFavoriteJobs = function(favorites,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({_id: {$in : favorites}}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.findBusinessJobs = function(businessId,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            dbo.collection(collection).find({user: businessId}).toArray( function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
                db.close();
            })
        });
    });
}

exports.findJobsByFilters = function(filters,collection) {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(constants.uriDatabase);

        console.log("FILTERS: ",filters);

        client.connect(function (err, db) {
            if (err) {
                reject(err);
            }
            const dbo = db.db(constants.databaseName);

            let filterQuery=[];

            if(filters.domainsFilters.length>0){
                filterQuery.push({domain: {$in: filters.domainsFilters}});
            }

            if(filters.studiesFilters.length>0){
                filterQuery.push({studyLevel: {$in: filters.studiesFilters}});
            }

            if(filters.careerLevelFilters.length>0){
                filterQuery.push({careerLevel: {$in: filters.careerLevelFilters}});
            }

            if(filters.jobTypesFilters.length>0){
                filterQuery.push({jobType:{$in: filters.jobTypesFilters}});
            }

            if(filters.search!==""){
                filterQuery.push({$text: {$search: filters.search}})
            }

            if(filterQuery.length>0){
                dbo.collection(collection).find({$and: filterQuery}).toArray( function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                    db.close();
                })
            }
            else{
                dbo.collection(collection).find({}).toArray( function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                    db.close();
                })
            }




            // dbo.collection(collection).find({$and: [{careerLevel: {$in: filters.careerLevelFilters}},{studyLevel: {$in: filters.studiesFilters}}, {jobType:{$in: filters.jobTypesFilters}}, {domain: {$in: filters.domainsFilters}}]}).toArray( function (err, result) {
            //     if (err) {
            //         reject(err);
            //     }
            //     resolve(result);
            //     db.close();
            // })
        });
    });
}