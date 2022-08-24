const express = require("express");
const router = express.Router();

const userInfoController = require("../controllers/userInfoController");

router.get("/",getUserInfo);
router.put("/",updateUserInfo);


function getUserInfo(req,res){

    userInfoController.getUserInfo(res.locals.user._id)
        .then(result=>{
            console.log("Result: ",result);
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function updateUserInfo(req,res){

    let aboutMe = req.body.aboutMe || null;
    let education = req.body.education || null;
    let experience = req.body.experience || null;
    let language = req.body.language || null;
    let links = req.body.links || null;
    let personalData = req.body.personalData || null;

    userInfoController.updateUserInfo(req.body.id,aboutMe,education,experience,language,links,personalData)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

module.exports = router;