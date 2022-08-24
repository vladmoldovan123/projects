const jwt = require("jsonwebtoken");
const constants = require("../utils/constants");
const database = require("../database/database");
const config = require("../utils/config");

module.exports = function () {

    return function(req,res,next){



        if (!req.header("Authorization")) {
            next();
        }
        else{
            let authHeader = req.header("Authorization");
            let authHeaderParts = authHeader.split(' '),
                authPrefix = String(authHeaderParts[0]).toLowerCase(),
                authValue = authHeaderParts[1];
            let authMethods = {
                bearer: function () {
                    jwt.verify(authValue, config.tokenSecret, (err, value) => {
                        if (err) {
                            if (err.name === 'TokenExpiredError') {
                                res.status(401).send(err);
                            } else {
                                res.status(401).send("Incorrect token!")
                            }
                        } else {
                            database.getDocumentById(value.userId, constants.userCollection)
                                .then(user => {
                                    res.locals.user=user;
                                    next();
                                })
                                .catch(err => {
                                    err.status = 401;
                                    next(err);
                                });
                        }
                    })
                },
                default: function () {
                    next(new Error("Wrong authorization method"));
                }

            };
            (authMethods[authPrefix] || authMethods["default"])();
        }
    }
}