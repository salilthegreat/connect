const mongoose = require("mongoose");
const { Schema } = mongoose

const CommentSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, ref: "Post" ,required:true},
    userId: { type: Schema.Types.ObjectId, ref: "User" , required:true},
    comment: { type: String }
},
    { timestamps: true }
)

module.exports = mongoose.model("Comment", CommentSchema)