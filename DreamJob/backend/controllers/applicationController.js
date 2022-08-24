const database = require("../database/database");
const constants = require("../utils/constants");
const uuidv4 = require("uuid/v4");
const applicationsQueries = require('../queries/applicationQueries');

exports.addApplication = function (application){

    return new Promise((resolve,reject)=>{

        database.insert(uuidv4(),application,constants.applicationCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })

    })
}


function getUsers(result){
    return new Promise((resolve,reject)=>{
        for(let i=0;i<result.length;i++){
            console.log("RESULT I: ",result[i]);
            database.getDocumentById(result[i].user,constants.userCollection)
                .then(r=>{
                    console.log("R: ",r);
                    result[i].user=r;
                    console.log("RESULT USER: ",result[i].user)
                })
        }
        resolve(result);
    })
}

exports.getApplicationsByJob = function (jobId){

    return new Promise((resolve,reject)=>{

        let promises = [];
        applicationsQueries.findApplicationsByJob(jobId,constants.applicationCollection)
            .then(result=>{

                for(let i=0;i<result.length;i++){
                    promises.push(database.getDocumentById(result[i].user,constants.userCollection)
                        .then(r=>{
                            result[i].user=r;
                        }));
                }
                Promise.all(promises)
                    .then(()=>{
                        resolve(result);
                    })
                    .catch(err=>{
                        reject(err);
                    })
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.getApplicationsByUser = function (userId){

    return new Promise((resolve,reject)=>{

        let promises = [];
        applicationsQueries.findApplicationsByUser(userId,constants.applicationCollection)
            .then(result=>{

                for(let i=0;i<result.length;i++){
                    promises.push(database.getDocumentById(result[i].job,constants.jobCollection)
                        .then(r=>{
                            result[i].job=r;
                        }));
                }

                Promise.all(promises)
                    .then(()=>{
                        resolve(result);
                    })
                    .catch(err=>{
                        reject(err);
                    })

            })
            .catch(err=>{
                reject(err);
            })
    })
}