const mongoose = require("mongoose");
const {Schema} = mongoose
const ConversationSchema = new mongoose.Schema({
    members: [{ type: Schema.Types.ObjectId, ref:"User" }]
},
    { timestamps: true },
)

module.exports = mongoose.model("Conversation",ConversationSchema)