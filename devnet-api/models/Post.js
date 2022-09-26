const mongoose = require("mongoose");

const PostTable = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        max: 200,
        required: true
    },
    image: {
        type: String
    },
    likes : {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Post", PostTable);