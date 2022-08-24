import axios from 'axios';
import * as Config from '../utils/Config'

const authenticateEndpoint = '/authenticate';
const resetPasswordEndpoint = '/reset-password';

const verifyAccount = async(confirmationCode) =>{

    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+authenticateEndpoint+'/confirm/'+confirmationCode)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const doLogin = async(user) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+authenticateEndpoint,user)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const resetPasswordEmail = async(email)=>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+resetPasswordEndpoint,{email: email})
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const resetPassword = async(data)=>{
    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+resetPasswordEndpoint+'/change',data)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

export {
    verifyAccount,
    doLogin,
    resetPasswordEmail,
    resetPassword
}