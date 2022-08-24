import axios from 'axios';
import * as Config from '../utils/Config'

const chatEndpoint="/chat";

const createChat = async (chat) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+chatEndpoint+'/create',chat,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const getConversations = async()=>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+chatEndpoint+'/get/user',{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const getBusinessConversations = async()=>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+chatEndpoint+'/get/business',{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const addMessage = async(data)=>{

    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+chatEndpoint+'/add-message',data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}


export {
    createChat,
    getConversations,
    getBusinessConversations,
    addMessage
}