const router = require('express').Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');
const multer = require("multer");
const express = require('express')
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { application } = require("express");
const path = require('path');
const { join } = require("path");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cookieParser("secret"));
router.use(express.json());
router.use(helmet());
router.use(morgan('common'));
router.use('/static',express.static(join(__dirname, 'assets/images')));
const saltRounds = 10;


var storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
});
  
const upload = multer({ storage: storage })

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.header('Access-Control-Allow-Headers', true);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

router.get("/details/:userId", multer().none(), async (req, res, next) => {
    let userId = req.params.userId;
    let message = "Korisnik ne postoji";

    try {
        const user = await User.findById(userId);
        if(user) {
            return res.status(200).json(user);
        } 
        else {
            return res.status(404).json(message);
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }

})

router.delete("/delete/:userId", async (req, res, next) => {
    let userId = req.params.userId;
    let bodyId = req.body.userId;
    let message = "Account je obrisan!";
    
    try {
        if(userId === bodyId) {
            const user = await User.deleteOne(userId);
            return res.status(200).json({message: message});
        }
        else {
            return res.status(403).json({ message: "Možete brisati samo svoj account!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
    
})


router.put("/update/:userId", upload.single('profile_picture'), async (req, res, next) => {
    let id = req.params.userId;
    let userId = req.body.userId;
    console.log(req.body);
    let message = "Možete editovati samo svoj account!";
    
    if(id === userId) {
        try {
            const user = await User.findByIdAndUpdate(id, { $set: { city: req.body.city, occupation: req.body.occupation, profile_picture: req.file.filename }});
            return res.status(200).json({ message: 'Uspješno ste ažurirali podatke!'});
        } catch (error) {
            return res.status(500).json({ message: error })
        }

    } else {
        return res.status(403).json({ message: message})
    }

})

router.put("/follow/:userId",  multer().none(), async (req, res) => {
    let message = "Ne možete zapratiti sami sebe!";

    if(req.body.userId !== req.params.userId) {
        try {
            const user = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.userId } })
                return res.status(201).json({ message: "Uspješno ste zapratili korisnika!" });
            }
            else {
                return res.status(200).json({ message: "Već pratite ovog korisnika!"});
            }
        } catch (error) {
            return res.status(500).json({ message: error }); 
        }
    }
    else {
        return res.status(200).json({ message: message });
    }
})

router.put("/unfollow/:userId", multer().none(), async (req, res) => {
    let message = "Ne možete zapratiti sami sebe!";

    if(req.body.userId !== req.params.userId) {
        try {
            const user = await User.findById(req.params.userId);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne(({ $pull: { followings: req.params.userId } }))
                return res.status(201).json({ message: "Uspješno ste otpratili korisnika!" });
            }
            else {
                return res.status(403).json({ message: "Već pratite ovog korisnika!"});
            }
        } catch (error) {
            return res.status(500).json({ message: error }); 
        }
    }
    else {
        return res.status(403).json({ message: message });
    }
})


router.put("/change-password",multer().none(), async (req, res, next) => {
    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;
    let userId = req.body.userId;

    console.log(req.body);

    if(oldPassword && newPassword) {
        let hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
        
        try {
            const user = await User.findById(userId);
            const validPassword = await bcrypt.compare(oldPassword, user.password);
            
            if(validPassword) {
                user.password = hashedNewPassword;
                user.save();
                return res.status(200).json({ message: 'Uspješno promijenjena šifra!'});
            } else {
                return res.status(201).json({ message: 'Stara šifra nije tačna!'});
            }
        } catch (error) {
            return res.status(500).json({ message: error });
        }
        
    } else {
        return res.status(403).json({ message: 'Polja ne smiju biti prazna!'});
    }

})


router.get("/followings/:userId", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map((friend) => {
            const {_id, first_name, last_name, profile_picture } = friend;
            friendList.push({_id, first_name, last_name, profile_picture });
        })

        console.log(friendList);
        res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json({ message: error });
    }
})

router.get("/search/:query", async (req, res, next) => {
    try {
        const usersByName = await User.find({ first_name:  { "$regex": req.params.query, "$options": "i" } });
        console.log(usersByName);
        if(!usersByName) {
            const usersByLastName = await User.find({ last_name:  { "$regex": req.params.query, "$options": "i" }  });
            console.log("po prezimenu" + usersByLastName)
            if(!usersByLastName) {
                return res.status(201).json('Pretraga ima 0 rezultata. :('); 
            }
            return res.status(200).json(usersByLastName);
        }
        if(usersByName) {
            return res.status(200).json(usersByName);
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
})



module.exports = router;