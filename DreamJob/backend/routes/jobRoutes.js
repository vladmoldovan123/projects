const express = require("express");
const router = express.Router();
const database = require('../database/database');
const constants = require("../utils/constants");

const jobController = require("../controllers/jobController");

router.post("/",addJob);
router.get("/",getJob);
router.get("/all",getAll);
router.get("/favorites",getFavorites);
router.get("/my-jobs",getBusinessJobs);
router.post("/filters",getJobsByFilters);

function addJob(req,res){

    const job ={
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        careerLevel: req.body.careerLevel,
        jobType: req.body.jobType,
        studyLevel: req.body.studyLevel,
        domain: req.body.domain,
        description: req.body.description,
        date:req.body.date,
        avatar:res.locals.user.avatar,
        user: res.locals.user._id
    }

    console.log("JOB: ",job);

    jobController.addJob(job)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getJob(req,res){

    const id= req.query.id;
    console.log("ID: ",id);

    database.getDocumentById(id,constants.jobCollection)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getAll(req,res){

    database.findAll(constants.jobCollection)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getFavorites(req,res){

    jobController.findUserFavoriteJobs(res.locals.user.favorites)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getBusinessJobs(req,res){

    jobController.findBusinessJobs(res.locals.user._id)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);

        })
}

function getJobsByFilters(req,res){

    const filters={
        careerLevelFilters: req.body.careerLevelFilters,
        studiesFilters: req.body.studiesFilters,
        jobTypesFilters: req.body.jobTypesFilters,
        domainsFilters: req.body.domainsFilters,
        search: req.body.search
    }

    jobController.getJobsByFilters(filters)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

module.exports = router;