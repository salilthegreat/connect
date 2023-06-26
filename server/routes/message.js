const Message = require("../models/Message");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

//CREATE A MESSAGE
router.post("/",verifyToken,async(req,res)=>{
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(200).json(newMessage)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET ALL MESSAGES
router.get("/:conversationId",verifyToken,async(req,res)=>{
    try {
        const messages = await Message.find({conversationId:req.params.conversationId});
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;