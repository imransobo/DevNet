const router = require('express').Router();
const Message = require("../models/Message");

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const bodyParser = require('body-parser');
const { join } = require("path");
const express = require('express')


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());
router.use(helmet());
router.use(morgan('common'));
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

router.get("/:conversationId", async (req, res, next) => {
    try {
        const messages = await Message.find({ 
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.post("/send", multer().none(), async (req, res, next) => {
    const newMessage = new Message({
        sender: req.body.sender,
        text: req.body.text,
        conversationId: req.body.conversationId
    })

    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;