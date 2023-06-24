const mongoose = require("mongoose");
const User = require("./User")
const Comment = require("./Comments")
const {Schema} = mongoose

const PostSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" ,required:true},
    img: { type: String },
    description: { type: String },
    likes: { type: Array },
    comments: [{ type: Schema.Types.ObjectId, ref: Comment }]
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostSchema)