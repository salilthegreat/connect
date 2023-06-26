const mongoose = require("mongoose")
const { Schema } = mongoose

const MessageSchema = new mongoose.Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: "Conversation" },
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String }
},
{timestamps:true})

module.exports = mongoose.model("Message", MessageSchema)