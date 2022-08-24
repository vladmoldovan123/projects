const database = require("../database/database");
const constants = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt_token = require("../jwt_token/jwt_token");
const uuidv4 = require("uuid/v4");


exports.findUserByEmail = function(email){
    return new Promise((resolve,reject)=>{
        let query={email: email}
        database.findDocumentByQuery(query,constants.userCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}

    exports.findUserByConfirmationCode = function(confirmationCode){
        return new Promise((resolve,reject)=>{
            let query={confirmationCode: confirmationCode}
            database.findDocumentByQuery(query,constants.userCollection)
                .then(result=>{
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

exports.setUserStatus = function (user){
    return new Promise((resolve,reject)=>{
        let query ={_id: user._id};
        user.status = constants.userActiveStatus;
        database.updateDocumentByQuery(query,user,constants.userCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.changeUserPassword = function (user,password){

    return new Promise((resolve,reject)=>{
        let query ={_id: user._id};
        bcrypt.hash(password, 10,(err,hash)=>{
            if(err){
                reject(err);
            }
            user.password = hash;
            database.updateDocumentByQuery(query,user,constants.userCollection)
                .then(result=>{
                    resolve(result);
                })
                .catch(err=>{
                    reject(err);
                })
        });
    })
}

exports.findUserById = function(id){
    return new Promise((resolve,reject)=>{
        let query={_id: id}
        database.findDocumentByQuery(query,constants.userCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}

exports.updateUserById = function(id,user){
    return new Promise((resolve,reject)=>{
        let query={_id:id};
        database.updateDocumentByQuery(query,user,constants.userCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.findAll = function() {
    return new Promise((resolve, reject) => {
        database.findAll(constants.userCollection)
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
}