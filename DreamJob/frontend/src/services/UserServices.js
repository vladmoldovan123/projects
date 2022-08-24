import axios from 'axios';
import * as Config from '../utils/Config'

const userEndpoint="/user";

const registerUser = async (user) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+userEndpoint,user)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const registerBusiness = async (business) =>{

    return new Promise((resolve,reject)=>{
        axios.post(Config.databaseUrl+userEndpoint+'/business',business)
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            })
    })
}

const getUser = async()=>{
    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+userEndpoint,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

const updateUser = async(user)=>{
    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+userEndpoint+"/update/user",user,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

const updateBusiness = async(business)=>{

    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+userEndpoint+"/update/business",business,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

const addJobToFavorites = async(data)=>{
    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+userEndpoint+"/add/job",data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

const removeJobFromFavorites = async(data)=>{
    return new Promise((resolve,reject)=>{
        axios.put(Config.databaseUrl+userEndpoint+"/remove/job",data,{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

const getFavorites = async()=>{
    return new Promise((resolve,reject)=>{
        axios.get(Config.databaseUrl+userEndpoint+'/favorites',{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("token")
            }
        })
            .then(result=>{
                resolve(result);
            })
            .catch(err=>{
                reject(err);
            });
    })
}

export{
    registerUser,
    getUser,
    updateUser,
    registerBusiness,
    updateBusiness,
    addJobToFavorites,
    getFavorites,
    removeJobFromFavorites
}