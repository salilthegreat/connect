const Post = require("../models/Post");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE A POST
router.post("/create",verifyToken, async(req,res)=>{
    try {
    const newPost =  new Post({...req.body,userId:req.user.userId});
    const savedPost = await newPost.save();
    res.status(200).json(savedPost) 
} catch (error) {
        res.status(500).json(error.message)
}

})

//GET A POST
router.get("/getone/:id",verifyToken,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate("userId","userName").exec(); //first param in populate is the object id key we want to populate and next are the values from that object what we want
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET ALL PROFILE POSTS
router.get("/getprofile/:userId",verifyToken,async(req,res)=>{
    try {
        const post = await Post.find({userId:req.params.userId});
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET FEED POSTS
router.get("/getfeed",verifyToken,async(req,res)=>{
    try {
        const currentUser = await User.findById(req.user.userId)
        const myPosts = await Post.find({userId:req.user.userId})
        const friendPosts = await Promise.all(currentUser.followings.map((following)=>{
            return Post.find({userId:following})
        }       
        ))
       const feedPosts = myPosts.concat(...friendPosts)
        res.status(200).json(feedPosts)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//UPDATE A POST
router.put("/updatepost/:postId/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try {    
        const post = await Post.findById(req.params.postId);
        if(post.userId != req.params.userId) return res.status(403).json("How dare you try to update other's post")
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId,{$set:req.body},{new:true});
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//DELETE A POST
router.delete("/:postId/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const post = await Post.findById(req.params.postId);
        if(post.userId != req.params.userId) return res.status(403).json("How dare you try to delete other's post")
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("Post has been delted successfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router;