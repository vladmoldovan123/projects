const database = require("../database/database");
const constants = require("../utils/constants");
const uuidv4 = require("uuid/v4");
const chatQueries = require("../queries/chatQueries");
const emailService = require("../email_services/emailService");

exports.createChat = function(chat){

    return new Promise((resolve,reject)=>{

        database.findDocumentByQuery({$and: [{user:chat.user},{business:chat.business}]},constants.chatCollection)
            .then(r=>{
                if(r===null)
                {
                    database.insert(uuidv4(),chat,constants.chatCollection)
                        .then(result=>{
                            resolve(result);
                        })
                        .catch(err=>{
                            reject(err);
                        })
                }
                else {
                    resolve(r);
                }
            })
            .catch(err=>{
                reject(err);
            })
    });
}

exports.getConversationsByUserId = function(id){

    return new Promise((resolve,reject)=>{

        let promises = [];

        chatQueries.findConversationsByUserId(id,constants.chatCollection)
            .then(result=>{
                for(let i=0;i<result.length;i++){
                    promises.push(database.getDocumentById(result[i].business,constants.userCollection)
                        .then(r=>{
                            result[i].business=r;
                            console.log("R: ",r);
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

exports.getConversationsByBusinessId = function(id){

    return new Promise((resolve,reject)=>{

        let promises = [];
        chatQueries.findConversationsByBusinessId(id,constants.chatCollection)
            .then(result=>{
                for(let i=0;i<result.length;i++){
                    promises.push(database.getDocumentById(result[i].user,constants.userCollection)
                        .then(r=>{
                            console.log("RRR: ",r);
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

exports.addMessage = function(message,chatId){

    return new Promise((resolve,reject)=>{

        database.findDocumentByQuery({_id:chatId},constants.chatCollection)
            .then(chat=>{
                   let messages=chat.messages;
                   messages.push(message);
                   chat.messages=messages;
                   database.updateDocumentByQuery({_id:chatId},chat,constants.chatCollection)
                       .then(result=>{
                           database.findDocumentByQuery({_id:chat.user},constants.userCollection)
                               .then(user=>{
                                   database.findDocumentByQuery({_id:chat.business},constants.userCollection)
                                       .then(business=>{
                                           if(message.author===user._id){
                                               emailService.sendMessageNotification(user.firstName+' '+user.lastName,business.name,business.email,"DreamJobs Mesaj Nou");
                                               console.log("USER");
                                           }
                                           else{
                                               emailService.sendMessageNotification(business.name,user.firstName+' '+user.lastName,user.email,"DreamJobs Mesaj Nou");
                                               console.log("BUSINESS");
                                           }
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
                       .catch(err=>{
                           reject(err);
                       })
            })
            .catch(err=>{
                reject(err);
            })
    })
}