const User = require("../models/User");
const bcrypt = require("bcrypt")
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//GET A USER
router.get("/find/:id", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user.toObject();
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }

})

//GET ALL USERS
router.get("/findall", verifyToken, async (req, res) => {
    try {
        const users = await User.find().limit(1);
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER USING PAGINATION
router.get("/findsorted", verifyToken, async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    try {
        const result = await User.find().sort({ _id: 1 }).limit(limit).skip(skipIndex).exec();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }

})

//UPDATE USER
router.put("/update/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }

})

//DELETE USER
router.delete("/delete/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("User deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//FOLLOW/UNFOLLOW A USER
router.put("/follow/:userId", verifyToken,async (req, res) => {
    try {
        if(req.user.userId == req.params.userId) return res.status(403).json("Don't you dare follow yourself, asshole")
        const currentUser =await  User.findById(req.user.userId); //user who wants to follow
        const secondUser = await User.findById(req.params.userId);
        if (secondUser.followers.includes(req.user.userId)) {
             await secondUser.updateOne({$pull:{followers:req.user.userId}})
             await currentUser.updateOne({$pull:{followings:req.params.userId}})
            return res.status(200).json("User has been unfollowed")
        } else {
            await secondUser.updateOne({$push:{followers:req.user.userId}});
            await currentUser.updateOne({$push:{followings:req.params.userId}});
            return res.status(200).json("User has been followed")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET FOLLOWERS
router.get("/followers/:userId",verifyToken,async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId).populate({path:"followers",select:["userName","firstName","lastName","profilePicture"]}).exec();
        res.status(200).json(user.followers)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET FOLLOWINGS
router.get("/followings/:userId",verifyToken,async(req,res)=>{
    try {
        const user = await User.findById(req.params.userId).populate({path:"followings",select:["userName","firstName","lastName","profilePicture"]});
        res.status(200).json(user.followings)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
module.exports = router;