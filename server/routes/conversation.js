const Conversation = require("../models/Conversation");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE A CONVERSSTION
router.post("/",verifyToken,async(req,res)=>{
    const conversationExist = await Conversation.findOne({members:{$all:[req.body.recieverId,req.body.senderId]}})
    if(conversationExist){ return res.status(200).json(conversationExist)    }
    try {
        const newConversation =  new Conversation(
            { members:[req.body.recieverId,req.body.senderId]}
        );
        await newConversation.save();
        res.status(201).json(newConversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
});

//FIND ALL CONVERSATION OF A USER
router.get("/:userId",verifyToken,async(req,res)=>{
    try {
        const conversations = await Conversation.find({members:{$in:[req.params.userId]}});
        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json(error.message)
    }
});

//FIND A CONVERSATION USING TWO ID
router.get("/:recieverId/:userId",verifyToken,async(req,res)=>{
    try {
        const conversation = await Conversation.findOne({members:{$all:[req.params.userId,req.params.recieverId]}});
        res.status(200).json(conversation)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;