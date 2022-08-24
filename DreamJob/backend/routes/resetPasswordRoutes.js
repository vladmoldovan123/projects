const express = require("express");
const userController = require("../controllers/userController");
const emailService = require("../email_services/emailService");
const userQueries = require("../queries/userQueries");
const {ConflictError} = require("../errors/domainErrors");
const router = express.Router();

const jwt_token = require("../jwt_token/jwt_token");

router.post("/",sendResetPasswordEmail);
router.post("/change",resetPassword);

function sendResetPasswordEmail(req,res){
    const email = req.body.email;
    userQueries.findUserByEmail(email)
        .then(userFound=> {
            console.log("USER: ",userFound);
            if (userFound === null) {
                res.status(404).send("Nu exista un cont asociat cu aceasta adresa de email!");
            }
            else{
                emailService.sendResetPasswordEmail(userFound.firstName,userFound.email,"Resetare parola",jwt_token.generateToken(userFound))
                res.status(200).send("A fost trimis un email pentru schimbarea parolei!")
            }
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function resetPassword(req,res){

    const passwordToken = req.body.token;
    const password= req.body.password;

    userController.resetPassword(passwordToken,password)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

module.exports = router;