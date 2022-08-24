import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";


const endpoint = {
    person: '/user'
};

function getUsers(callback) {
    let request = new Request(HOST.backend_api + endpoint.person, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}

function insertUser(user,callback){
    let request = new Request(HOST.backend_api + endpoint.person,{
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request,callback)
}
function updateUser(user,id,callback){
    let request = new Request(HOST.backend_api + endpoint.person+'/'+id,{
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request,callback)
}

function deleteUser(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.person+'/'+id, {
        method: 'DELETE',
    });
    RestApiClient.performRequest(request, callback);
}

function linkDevice(user,id,callback){
    let request = new Request(HOST.backend_api + endpoint.person+'/device/'+id,{
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    RestApiClient.performRequest(request,callback)
}

export {
    getUsers,
    insertUser,
    updateUser,
    deleteUser,
    linkDevice
}