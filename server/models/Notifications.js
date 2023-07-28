const mongoose = require("mongoose");
const {Schema} = mongoose

const NotificationSchema = new mongoose.Schema({
    type: { type: String,required:true },
    senderId: { type: Schema.Types.ObjectId, ref: "User",required:true },
    recieverId:{type:Schema.Types.ObjectId, ref:"User",required:true},
    postId:{type:Schema.Types.ObjectId, ref:"Post"},
    commentId:{type:Schema.Types.ObjectId, ref:"Comment"}
},
{timestamps:true},
)

module.exports = mongoose.model("Notification",NotificationSchema)