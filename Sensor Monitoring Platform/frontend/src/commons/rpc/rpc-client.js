import JsonRpcClient from "react-jsonrpc-client";

function getValues(userId, days){

    return new Promise((resolve,reject)=>{


            let api = new JsonRpcClient({
                endpoint: 'http://localhost:8080/rpc',
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
            })
            api.request(
                "getValues",
                    userId,
                    days
            ).then(function(response) {
                resolve(response);
                //return response;
            });
    });
}

export default getValues;