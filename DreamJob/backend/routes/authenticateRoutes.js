const express = require("express");
const router = express.Router();
const constants = require("../utils/constants")

router.post("/",login);
router.get("/all",getAll);
router.put("/confirm/:confirmationCode",verifyUser)

const userController = require("../controllers/userController");
const jwt_token = require("../jwt_token/jwt_token");
const bcrypt = require("bcrypt");
const userQueries = require("../queries/userQueries");


function login(req,res){
    let email = req.body.email;
    let password = req.body.password;
    userQueries.findUserByEmail(email)
        .then(result => {
            if(result !== null){
                if(result.status===constants.userActiveStatus){
                    bcrypt.compare(password,result.password, function(err,r){
                        if(r){
                            const data ={
                                token: jwt_token.generateToken(result),
                                role: result.role,
                                avatar: result.avatar
                            };
                            res.status(200).send(data);
                        }
                        else{
                            res.status(405).send("Parola este gresita!");
                        }
                    })
                }
                else{
                    console.log("406");
                    res.status(406).send("Contul nu este confirmat!");
                }
            }
            else{
                console.log("HERE!");
                res.status(402).send("Nu exista un cont asociat cu aceast email!");
            }
        });
}

function verifyUser(req,res){
    let confirmationCode= req.params.confirmationCode;

    userController.verifyUser(confirmationCode)
        .then((result)=>{
            res.status(201).send(result);
        })
        .catch((err)=>{
            if(err.name ==="ConflictError"){
                res.status(405).send(err.message);
            }
            else{
                res.status(500).send(err);
            }

        })
}

function getAll(req,res){

    console.log("Req: ",req.body);
    userController.findAll()
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

module.exports = router;