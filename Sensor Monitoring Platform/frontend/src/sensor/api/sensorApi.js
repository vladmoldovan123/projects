import {HOST} from '../../commons/hosts';
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    sensor: '/sensor'
};

function getSensors(callback) {
    let request = new Request(HOST.backend_api + endpoint.sensor, {
        method: 'GET',
    });
    RestApiClient.performRequest(request, callback);

}

function insertSensor(sensor,callback){
    let request = new Request(HOST.backend_api + endpoint.sensor,{
        method: 'POST',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sensor)
    });

    RestApiClient.performRequest(request,callback)
}

function updateSensor(sensor,id,callback){
    let request = new Request(HOST.backend_api + endpoint.sensor+'/'+id,{
        method: 'PUT',
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sensor)
    });

    RestApiClient.performRequest(request,callback);
}

function deleteSensor(id,callback) {
    let request = new Request(HOST.backend_api + endpoint.sensor+'/'+id, {
        method: 'DELETE',
    });
    RestApiClient.performRequest(request, callback);
}

export{
    getSensors,
    insertSensor,
    updateSensor,
    deleteSensor
}