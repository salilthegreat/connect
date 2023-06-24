const mongoose = require("mongoose");
const User = require("./User")
const Post = require("./Post")
const { Schema } = mongoose

const CommentSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    comment: { type: String }
},
    { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema)