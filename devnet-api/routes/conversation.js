const router = require('express').Router();
const Conversation = require("../models/Conversation");

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

router.post("/create", async (req, res, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    })
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/:userId", async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get("/find/:firstUser/:secondUser", async (req, res, next) => {
    try {
        const existingConversation = await Conversation.findOne({
            members: { $all: [req.params.firstUser, req.params.secondUser] },
        })
        if(existingConversation === null) {
            const conversation = new Conversation({
                members: [req.params.senderId, req.params.receiverId]
            })

            await conversation.save();
            return res.status(200).json(conversation);
        }
        return res.status(200).json(existingConversation);
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;