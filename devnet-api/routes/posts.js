const router = require('express').Router();

const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const { join } = require("path");
const express = require('express')
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('../models/User');
const Post = require('../models/Post');
const moment = require("moment");

router.use('/static',express.static(join(__dirname, 'assets/images')));
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(express.json());
router.use(helmet());
router.use(morgan('common'));


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

var storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
});
  
const upload = multer({ storage: storage })

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
   { useNewUrlParser: true },
   { useUnifiedTopology: true},
    () => {
  console.log("Connected to MongoDB");
});


router.post("/create", upload.single('post_image'), async (req, res, next) => {
    let userId = req.body.userId;
    let post_text = req.body.post_text;
    let image = req.file;
    
    const newPost = new Post({
        userId: userId,
        text: post_text,
        image: image.filename
    })

    try {
        const savedPost = await newPost.save();
        return res.status(201).json({ message: savedPost });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    
})

router.put("/update/:id", async (req, res, next) => {
    let id = req.params.id;
    let post_text = req.body.post_text;
    let message = "SUCCESS";
    try {
        const post = await Post.findById(id);
        if(post.userId === req.body.userId) {
            await Post.updateOne({ $set: { text: post_text } });
            res.status(200).json({ message: message })
        } else {
            res.status(403).json({ message: 'Možete editovati samo svoju objavu!'})
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }

})


router.delete("/delete/:id", async (req, res, next) => {
    let id = req.params.id;
    let post_text = req.body.post_text;
    let message = "OBRISANO";
    try {
        const post = await Post.findById(id);
        if(post.userId === req.body.userId) {
            await Post.deleteOne();
            res.status(200).json({ message: message })
        } else {
            res.status(403).json({ message: 'Možete obrisati samo svoju objavu!'})
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }

})


router.put("/like/:id/:userId", async(req, res, next) => {
    let message1 = "Lajkali ste objavu";
    let message2 = "Odlajkali ste objavu";

    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.params.userId)) {
            await Post.updateOne({ $push: { likes: req.params.userId } });
            res.status(201).json({ message: message1 })
        }
        if(post.likes.includes(req.params.userId)) {
            await Post.updateOne({ $pull: { likes: req.params.userId }});
            res.status(200).json({ message: message2 })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get("/:id", async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({ message: post});
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get("/feed/:userId", async(req, res, next) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId })
            })
        )

        let userBirthdate = moment(currentUser.birth_date).format('MM-DD');
        let today = moment(Date.now()).format('MM-DD');
        let isBirthday = userBirthdate === today;

        res.status(200).json({ message: userPosts.concat(...friendPosts), message1: userPosts, message2: isBirthday })
    } catch (error) {
        res.status(500).json({ message: error });
    }
})

router.get("/profile/:userId", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.userId });
        const posts = await Post.find({ userId: user._id }); 
        res.status(200).json(posts);
    } catch (error) {
         res.status(500).json(err);
    }
})






module.exports = router;