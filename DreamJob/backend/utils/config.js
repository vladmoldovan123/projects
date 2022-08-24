const config = require(getConfigFile());

module.exports={
    tokenSecret: "SECRET-KEY",
    tokenExpiration: 1800000,
    tokenEmailSecret: "MY-PRIVATE-KEY",
    tokenEmailExpiration: 360,
    apiPath: config.apiPath
}

function getConfigFile() {
    return "../config/config.json";
}