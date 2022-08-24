const express = require("express");
const router = express.Router();
const emailService = require("../email_services/emailService");


router.post("/",registerUser);
router.post("/business",registerBusiness);
router.get("/all",getAll);
router.get("/",getUser);
router.put("/update/user",updateUser);
router.put("/update/business",updateBusiness);
router.put("/add/job",addJobToFavorites);
router.get("/favorites",getFavorites);
router.put("/remove/job",removeJobFromFavorites);

const userController = require("../controllers/userController");
const database = require("../database/database");
const constants = require("../utils/constants");

function registerUser(req,res){

    console.log("REGISTER USER");

    let user ={
        email:req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        county: req.body.county,
        city: req.body.city,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        phone: req.body.phone,
        avatar: req.body.avatar,
        favorites: req.body.favorites,
        role: "client"
    }

    userController.registerUser(user)
        .then(result => {
            emailService.sendConfirmationEmail(user.email,user.email,"Confirmare cont",result.confirmationCode);
            res.status(201).send(result);

        })
        .catch(err => {
            if(err.name ==="ConflictError"){
                res.status(405).send(err.message);
            }
            else{
                res.status(500).send(err);
            }
        })
}

function updateUser(req,res){

    let user = {
        email:req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        county: req.body.county,
        city: req.body.city,
        birthDate: req.body.birthDate,
        gender: req.body.gender,
        phone: req.body.phone,
        avatar: req.body.avatar,
        favorites: req.body.favorites,
        role: "client"
    }

    userController.updateUser(res.locals.user._id,user)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function addJobToFavorites(req,res){

    let jobId = req.body.jobId;

    let user = res.locals.user;
    user.favorites.push(jobId);


    userController.updateUser(res.locals.user._id,user)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })

}

function removeJobFromFavorites(req,res){
    let jobId = req.body.jobId;

    let user = res.locals.user;

    user.favorites = user.favorites.filter(item => item !== jobId);

    userController.updateUser(res.locals.user._id,user)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })

    res.status(201);

}

function updateBusiness(req,res){

    let business = res.locals.user;
    business.email= req.body.email;
    business.name= req.body.name;
    business.address=req.body.address;
    business.city=req.body.city;
    business.avatar=req.body.avatar;

    userController.updateUser(res.locals.user._id,business)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function registerBusiness(req,res){
    console.log("Req: ",req.body);
    let business ={
        email:req.body.email,
        password: req.body.password,
        name:req.body.name,
        countryCode: req.body.countryCode,
        registrationCode: req.body.registrationCode,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        avatar: req.body.avatar,
        role: "business"
    }

    userController.registerUser(business)
        .then(result => {
            emailService.sendConfirmationEmail(business.email,business.email,"Confirmation account",result.confirmationCode);
            res.status(201).send(result);

        })
        .catch(err => {
            if(err.name ==="ConflictError"){
                res.status(405).send(err.message);
            }
            else{
                res.status(500).send(err);
            }

        })
}

function getAll(req,res){

    database.findAll(constants.userCollection)
        .then(result => {
            res.status(201).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

function getFavorites(req,res){
    res.status(200).send(res.locals.user.favorites);

}

function getUser(req,res){

    res.status(200).send(res.locals.user);
}

module.exports = router;