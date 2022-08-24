const database = require("../database/database");
const constants = require("../utils/constants");
const userInfoQueries = require("../queries/userInfoQueries")

exports.getUserInfo = function(userId){

    return new Promise((resolve,reject)=>{

        userInfoQueries.findUserInfoById(userId)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

exports.updateUserInfo = function(id,aboutMe,education,experience,language,links,personalData){
    return new Promise((resolve,reject)=>{
        database.getDocumentById(id,constants.userInfoCollection)
            .then(result=>{
                let userInfo= result;
                if(aboutMe!==null){
                    userInfo.aboutMe = aboutMe;
                }
                if(education!==null){
                    userInfo.education= education;
                }
                if(experience!==null){
                    userInfo.experience= experience;
                }
                if(language!==null){
                    userInfo.language = language;
                }
                if(links!==null){
                    userInfo.links = links;
                }
                if(personalData!=null){
                    userInfo.personalData= personalData;
                }
                database.updateDocumentByQuery({_id:id},userInfo,constants.userInfoCollection)
                    .then(r=>{
                        resolve(r);
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