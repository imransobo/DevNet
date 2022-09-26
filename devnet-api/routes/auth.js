const router = require("express").Router();
const multer = require("multer");
const bcrypt = require("bcrypt");
const express = require('express')
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { application } = require("express");
const { join } = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
router.use(cookieParser("secret"));
router.use(express.json());
router.use(helmet());
router.use(morgan('common'));
router.use('/static',express.static(join(__dirname, 'assets/images')));

const saltRounds = 10;

const User = require("../models/User");
dotenv.config();
mongoose.connect(process.env.MONGO_URL,
   { useNewUrlParser: true },
   { useUnifiedTopology: true},
    () => {
  console.log("Connected to MongoDB");
});

var storage = multer.diskStorage({
  destination: 'assets/images',
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

helmet({
  crossOriginResourcePolicy: false,
})

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',"Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

router.post('/register', upload.single('profile'), async (req, res, next) => {
  const findUser = await User.findOne({ email: req.body.email });
  const errMsg = "Korisnik već postoji";

  if(findUser) {
    return res.status(200).json(errMsg);
  }
  console.log(findUser);

  try {
    let hashedPass = await bcrypt.hash(req.body.userPassword, saltRounds);
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPass,
        profile_picture: req.file.filename,
        cover_picture: req.body.cover_picture,
        birth_date: req.body.birth_date,
        occupation: req.body.occupation,
        city: req.body.city
      })
      await user.save();
      return res.status(201).json(user);    
  } catch (error) {
    console.log(errMsg);
    return res.status(500).json({ message: errMsg });
  }
})


router.post("/login", async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  const errMsg = "Korisnik sa tim mailom/passwordom ne postoji";
  try {
    const user = await User.findOne({ email: email });
    if(!user){
     return res.status(404).json({ message: errMsg });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(validPassword)
    if(!validPassword) {
      return res.status(404).json({ message: errMsg });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.json(500).json(error);
  }
    
})

module.exports = router;