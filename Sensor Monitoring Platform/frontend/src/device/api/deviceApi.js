import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    device: '/device'
};

function getDevices(callback) {
    let request = new Request(HOST.backend_api + endpoint.device, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);
}

function insertDevice(device,callback){
    let request = new Request(HOST.backend_api + endpoint.device,{
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    RestApiClient.performRequest(request,callback)
}

function updateDevice(device,id,callback){
    let request = new Request(HOST.backend_api + endpoint.device+'/'+id,{
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    RestApiClient.performRequest(request,callback)
}

function linkSensor(device,id,callback){
    let request = new Request(HOST.backend_api + endpoint.device+'/sensor/'+id,{
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(device)
    });

    RestApiClient.performRequest(request,callback)
}

function deleteDevice(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.device+'/'+id, {
        method: 'DELETE',
    });
    RestApiClient.performRequest(request, callback);
}

export {
    getDevices,
    insertDevice,
    updateDevice,
    deleteDevice,
    linkSensor
}