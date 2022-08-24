import axios from 'axios';
import * as Config from '../utils/Config'

const applicationEndpoint="/application";

const addApplication = async (application) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+applicationEndpoint+'/add',application,{
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

const getApplicationsByJob = async (job) =>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+applicationEndpoint+'/job/'+job,{
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

const getApplicationsByUser = async () =>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+applicationEndpoint+'/user',{
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
    addApplication,
    getApplicationsByJob,
    getApplicationsByUser
}