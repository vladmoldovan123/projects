import axios from 'axios';
import * as Config from '../utils/Config'

const jobEndpoint="/jobs";


const getUserFavoriteJobs = async ()=>{
    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+jobEndpoint+"/favorites",{
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



const addJob = async (job) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+jobEndpoint,job,{
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
const getJob = async (id) =>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+jobEndpoint+'?id='+id)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const getJobs = async () =>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+jobEndpoint+"/all")
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const getBusinessJobs = async()=>{

    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+jobEndpoint+"/my-jobs",{
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

const getJobsByFilters = async(filters)=>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+jobEndpoint+'/filters',filters,{
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

export{
    addJob,
    getJob,
    getJobs,
    getUserFavoriteJobs,
    getBusinessJobs,
    getJobsByFilters
}