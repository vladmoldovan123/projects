const jwt = require("jsonwebtoken");
const config = require("../utils/config")

exports.generateToken = function (user){
    return jwt.sign({ userId: user._id }, config.tokenSecret, { expiresIn: config.tokenExpiration });
}

exports.generateTokenEmail = function (email){
    return jwt.sign({userEmail:email},config.tokenEmailSecret,{expiresIn: config.tokenEmailExpiration})
}

exports.getId = function (token){
    return (jwt.decode(token)).userId;
}

