const database = require("../database/database");
const constants = require("../utils/constants");
const bcrypt = require("bcrypt");
const jwt_token = require("../jwt_token/jwt_token");
const { ConflictError} = require("../errors/domainErrors");

const uuidv4 = require("uuid/v4");

const userQueries= require("../queries/userQueries");

const emailService = require("../email_services/emailService");

exports.registerUser = function (user){
    return new Promise((resolve,reject) =>{

        userQueries.findUserByEmail(user.email)
            .then(userFound=>{
                if(userFound !==null){
                    reject(new ConflictError("Exista deja un cont asociat cu acest email", user.email))
                }
                else{
                    bcrypt.hash(user.password, 10,(err,hash)=>{
                        if(err){
                            reject(err);
                        }
                        user.password = hash;
                        user.status = constants.userPendingStatus;
                        user.confirmationCode = jwt_token.generateTokenEmail(user.email);

                        const userId = uuidv4();
                        database.insert(userId,user,constants.userCollection)
                            .then(result=>{
                                result.confirmationCode = user.confirmationCode;
                                if(user.role==='client'){
                                    let userInfo={
                                        personalData:{
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            phone: user.phone,
                                            email: user.email,
                                            birthDate: user.birthDate,
                                            address: ''
                                        },
                                        links:{
                                            linkedin:'',
                                            github:'',
                                            portfolio:''
                                        },
                                        aboutMe:'',
                                        education:[],
                                        experience:[],
                                        language:[],
                                        user: userId
                                    }
                                    database.insert(uuidv4(),userInfo,constants.userInfoCollection)
                                        .then(r=>{
                                            resolve(result);
                                        })
                                        .catch(err=>{
                                            reject(err);
                                        })
                                }
                                else{
                                    resolve(result);
                                }
                            })
                            .catch(err => {
                                reject(err);
                            });
                    });
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}

    exports.verifyUser= function(confirmationCode){
        return new Promise((resolve,reject)=>{
            userQueries.findUserByConfirmationCode(confirmationCode)
                .then(result=>{
                    if(result!==null){
                        userQueries.setUserStatus(result)
                            .then(r=>{
                                resolve(r);
                            })
                            .catch(err => {
                                reject(r);
                            })
                    }
                    else{
                        reject(new ConflictError("Link-ul de confirmare a expirat!", confirmationCode));
                    }
                })
                .catch(err => {
                    reject(err);
                })
        })
    }


exports.sendResetPasswordMail = function(email){

    return new Promise((resolve,reject)=>{
        userQueries.findUserByEmail(email)
            .then(userFound=> {
                if (userFound === null) {
                    reject(new ConflictError("Nu exista un cont asociat cu acest email!", email));
                }
                else{
                    emailService.sendResetPasswordEmail(userFound.firstName,userFound.email,"Resetare parola")
                    resolve()
                }
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.resetPassword = function(token,password){

    return new Promise((resolve,reject)=>{
        const userId = jwt_token.getId(token);
        userQueries.findUserById(userId)
            .then(user=>{
                userQueries.changeUserPassword(user,password)
                    .then(result=>{
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

exports.updateUser =function(id,user){
    return new Promise((resolve,reject)=>{
        userQueries.updateUserById(id,user)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}