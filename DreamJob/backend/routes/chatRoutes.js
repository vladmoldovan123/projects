const express = require("express");
const router = express.Router();
const constants = require("../utils/constants");
const chatController = require("../controllers/chatController");

router.post("/create",createChat);
router.get("/get/user",getConversationsByUserId);
router.get("/get/business", getConversationsByBusinessId);
router.put("/add-message",addMessage);

function createChat(req,res){

    const chat={
        messages: [],
        user: res.locals.user._id,
        business: req.body.business
    }

    chatController.createChat(chat)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getConversationsByUserId(req,res){

    chatController.getConversationsByUserId(res.locals.user._id)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function getConversationsByBusinessId(req,res){

    chatController.getConversationsByBusinessId(res.locals.user._id)
        .then(result=>{
            res.status(200).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })
}

function addMessage(req,res){

    const message = {
        author: req.body.content.author,
        message: req.body.content.message,
        read: req.body.content.read,
        timestamp: req.body.content.timestamp
    }

    chatController.addMessage(message,req.body.room)
        .then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            res.status(500).send(err);
        })

}

module.exports = router;