const database = require("../database/database");
const constants = require("../utils/constants");

exports.findUserInfoById= function(id){

    return new Promise((resolve,reject)=>{
        let query={user: id}
        database.findDocumentByQuery(query,constants.userInfoCollection)
            .then(result=>{
                resolve(result);
            })
            .catch(err => {
                reject(err);
            });

    })
}