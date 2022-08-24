const database = require("../database/database");
const constants = require("../utils/constants");
const uuidv4 = require("uuid/v4");
const jobQueries = require("../queries/jobQueries");

exports.addJob = function (job){

    return new Promise((resolve,reject)=>{

        database.insert(uuidv4(),job,constants.jobCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.findUserFavoriteJobs = function (favorites){

    return new Promise((resolve,reject)=>{
        jobQueries.findUserFavoriteJobs(favorites,constants.jobCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })

    })
}

exports.findBusinessJobs = function (businessId){

    return new Promise((resolve,reject)=>{

        jobQueries.findBusinessJobs(businessId,constants.jobCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}


exports.getJobsByFilters= function(filters){

    return new Promise((resolve,reject)=>{

        jobQueries.findJobsByFilters(filters,constants.jobCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })

    })
}