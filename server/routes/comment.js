const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE A COMMENT
router.post("/:postId/:userId", verifyToken, async (req, res) => {
    try {
        const newComment = new Comment({
            postId:req.params.postId,
            userId:req.params.userId,
            comment:req.body.comment
        });
        const post = await Post.findById(req.params.postId)
        const savedComment = await newComment.save();
        await post.updateOne({$push:{comments:savedComment._id}})
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//FETCH ALL COMMENTS
router.get("/:postId", verifyToken, async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//EDIT A COMMENT
router.put("/:commentId/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (comment.userId == req.params.userId) {
            const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, { $set: req.body }, { new: true });
            return res.status(200).json(updatedComment)
        } else {
            return res.status(403).json("You are not allowed to update this comment buddy")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//DELETE A COMMENT
router.delete("/:commentId/:userId",verifyToken,async(req,res)=>{
    try {
        const comment = await Comment.findById(req.params.commentId);
        const post = await Post.findById(comment.postId);
        if(comment.userId== req.params.userId || post.userId ==req.params.userId){ //Both user and owner of the post can delete a comment
            await Comment.findByIdAndDelete(req.params.commentId);
            res.status(200).json("Deleted")
        }
        else return res.status(403).json("How dare you try to delete other's comment,you homewrecker!")
    } catch (error) {
        res.status(500).json(error.message)
    }
})


module.exports = router