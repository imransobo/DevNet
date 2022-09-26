const mongoose = require("mongoose");

const UserTable = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        min: 2,
        max: 30,

    },
    last_name: {
        type: String,
        required: true,
        min: 2,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        max: 40,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    profile_picture: {
        type: String,
        default: ""
    },
    cover_picture: {
        type: String,
        default: ""
    },
    birth_date: {
        type: String,
        default: ""
    },
    occupation: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
},
{ timestamps: true }
)


module.exports = mongoose.model("User", UserTable);