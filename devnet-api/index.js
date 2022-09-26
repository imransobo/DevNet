const { resolveSoa } = require('dns');
const express = require('express')
const app = express();

const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { join } = require('path');
const nodemailer = require("nodemailer");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");
const multer = require('multer');

const port = 5000;

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
)

dotenv.config();
mongoose.connect(process.env.MONGO_URL,
   { useNewUrlParser: true },
   { useUnifiedTopology: true},
    () => {
  console.log("Connected to MongoDB");
});

app.use(cookieParser("secret"));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);

const corsOptions = {
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use('/static',express.static(join(__dirname, 'assets/images')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

var transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587,
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
});

app.post("/sendEmail", multer().none(), (req, res, next) => {
  var mailOptions = {
    from: process.env.email,
    to: process.env.receiverEmail,
    subject: req.body.title,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      return res.status(200).json(info.response);
    }
  });
})




