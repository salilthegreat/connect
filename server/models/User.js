const mongoose = require("mongoose");

const UserSchmea = new mongoose.Schema(
    {
        userName: { type: String, required: true, unique: true },
        email : { type:String, required: true, unique: true},
        firstName : {type: String, required: true},
        lastName : { type: String, required: true},
        password: {type: String, required: true},
        profession: {type: String},
        currentCity: {type: String},
        country: {type: String},
        isAdmin: {type: Boolean,default:false},
        instagram: {type: String},
        facebook: {type: String},
        linkedIn: {type: String},
        profilePicture: {type: String},
        coverPicture: {type: String},
    },
    {timestamps: true}
)

module.exports = mongoose.model("User",UserSchmea)