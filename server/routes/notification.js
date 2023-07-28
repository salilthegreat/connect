const router = require("express").Router();
const Notification = require("../models/Notifications");
const { verifyToken } = require("./verifyToken");

//CREATE OR REMOVE A NOTIFICATION LIKE/FOLLOW
router.post("/likefollow",verifyToken,async(req,res)=>{

    if(req.body.senderId === req.body.recieverId){
        return res.status(201).json("Go ahead like as much as you want, we won't send notification")
    }
    
    const hasNotification = await Notification.findOne(req.body);
    if(hasNotification){
        await Notification.deleteOne(req.body);
        return res.status(200).json("Like Notification removed")
    }
    try { 
        const notification = new Notification(req.body);
        await notification.save();
        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json(error)
    }
})

//CREATE OR REMOVE NOTIFICATIONS FOR COMMENTS
router.post("/comment",verifyToken,async(req,res)=>{
    if(req.body.senderId === req.body.recieverId){
     return res.status(201).json("Comment as much as you want , we won't send notifications")
    }
    const hasNotification = await Notification.findOne(req.body);
    if(hasNotification){
        await Notification.deleteOne(req.body);
        return res.status(201).json("Comment Notification Removed")
    }
    try {
        const notification = new Notification(req.body);
        await notification.save();
        res.status(200).json(notification)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL NOTIFICATION OF A USER
router.get("/",verifyToken,async(req,res)=>{
    try{
        const notifications = await Notification.find({recieverId:req.user.userId}).populate({path:"senderId",select:["userName","firstName","lastName","profilePicture"]}).populate({path:"recieverId",select:["userName","firstName","lastName","profilePicture"]}).populate({path:"postId",select:["img"]}).sort({createdAt:-1}).exec();
        res.status(200).json(notifications)
    }
    catch(error){
        res.status(500).json(error)
    }

})

module.exports = router