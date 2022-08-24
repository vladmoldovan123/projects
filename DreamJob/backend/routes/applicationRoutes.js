const express = require("express");
const router = express.Router();
const constants = require("../utils/constants");
const applicationController = require("../controllers/applicationController");
const database = require("../database/database");

router.post("/add",addApplication);
router.get("/job/:jobId",getApplicationsByJob);
router.get("/user",getApplicationsByUser);

function addApplication(req,res){

    const application = {
        user: res.locals.user._id,
        cv: req.body.cv,
        job: req.body.job,
    }

    database.findDocumentByQuery({$and:[{user:application.user}, {job: application.job}]}, constants.applicationCollection)
        .then(app=>{
            if(app===null){
                applicationController.addApplication(application)
                    .then(result=>{
                        res.status(201).send(result);
                    })
                    .catch(err=>{
                        res.status(500).send(err);
                    })
            }
            else{
                res.status(208).send("Exista deja o aplicatie pentru acest loc de munca");
            }

        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getApplicationsByJob(req,res){

    let jobId= req.params.jobId;


    applicationController.getApplicationsByJob(jobId)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getApplicationsByUser(req,res){

    applicationController.getApplicationsByUser(res.locals.user._id)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

module.exports = router;