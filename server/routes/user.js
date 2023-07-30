const User = require("../models/User");
const bcrypt = require("bcrypt")
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");
const jwt = require("jsonwebtoken")

const router = require("express").Router();

//GET A USER
router.get("/find/:userId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const { password, ...others } = user.toObject();
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }

})

// GET USER EXCEPT THE CURRENTUSER AND THEIR FOLLOWINGS
router.get("/findusers", verifyToken, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.userId).select('followings'); //followings with id
        const followingIds = currentUser.followings; //only followings of currentuser
        const usersNotFollowing = await User.find({ _id: { $nin: followingIds.concat([req.user.userId]) } }).limit(6); //find users which are not included in following list and currentuser
        res.status(200).json(usersNotFollowing);
    } catch (error) {
        res.status(500).json(error);
    }
});

//SEARCH USER THROUGH API CALL
router.get("/search", verifyToken, async (req, res) => {
    try {
        const { q } = req.query;
        const filterdSearch = {
            $or: [
                { firstName: { $regex: q, $options: "i" } }, //search for firstname and "i" for  case insensitiv
                { lastName: { $regex: q, $options: "i" } },
                { userName: { $regex: q, $options: "i" } },
                {
                    $expr: {
                        $regexMatch: {
                            input: { $concat: ["$firstName", " ", "$lastName"] },
                            regex: new RegExp(q, "i") // Case-insensitive combined search (firstName + lastName)
                        }
                    }
                }
            ],
            _id: { $ne: req.user.userId } //excluding the currentuserId from the search
        }
        const searchUser = await User.find(filterdSearch)
        res.status(200).json(searchUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//SEARCH USER FOLLOWINGS WHICH MATCH THE QUERY
router.get("/msgsearch", verifyToken, async (req, res) => {
    try {
        const { q } = req.query;
        const currentUser = await User.findById(req.user.userId).select("followings");
        const userFollowings = currentUser.followings;
        const searchedUser = await User.find({
            $and: [
                {
                    $or: [
                        { firstName: { $regex: q, $options: "i" } },
                        { lastName: { $regex: q, $options: "i" } },
                        { userName: { $regex: q, $options: "i" } },
                        {
                            $expr: {
                                $regexMatch: {
                                    input: { $concat: ["$firstName", " ", "$lastName"] },
                                    regex: new RegExp(q, "i")
                                }
                            }
                        }
                    ]
                },
                { _id: { $in: userFollowings } }
            ]
        })
        res.status(200).json(searchedUser)
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
        const currentUser = await User.findById(req.user.userId).select('followings');
        const followingIds = currentUser.followings;
        const usersNotFollowing = await User.find({ _id: { $nin: followingIds.concat([req.user.userId]) } }).skip(skipIndex).limit(limit).exec();
        // if(usersNotFollowing.length === 0){
        //     return res.status(201).json("No More Suggestions to show")
        // }
        res.status(200).json(usersNotFollowing);
    } catch (error) {
        res.status(500).json(error);
    }

})

//UPDATE USER
router.put("/update/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        if (req.body.userName) {
            const user = await User.findOne({ userName: req.body.userName });
            if (user) {
                return res.status(401).json("Username already taken")
            }
        }
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true })
        const accessToken = jwt.sign({ userId: updatedUser._id, isAdmin: updatedUser.isAdmin }, process.env.JWT_SECRET)
        res.status(200).json({ ...updatedUser._doc, accessToken })
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
router.put("/follow/:userId", verifyToken, async (req, res) => {
    try {
        if (req.user.userId == req.params.userId) return res.status(403).json("Don't you dare follow yourself, asshole")
        const currentUser = await User.findById(req.user.userId); //user who wants to follow
        const secondUser = await User.findById(req.params.userId);
        if (secondUser.followers.includes(req.user.userId)) {
            await secondUser.updateOne({ $pull: { followers: req.user.userId } })
            await currentUser.updateOne({ $pull: { followings: req.params.userId } })
            return res.status(200).json("Unfollowed")
        } else {
            await secondUser.updateOne({ $push: { followers: req.user.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.userId } });
            return res.status(200).json("Followed")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET FOLLOWERS
router.get("/followers/:userId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({ path: "followers", select: ["userName", "firstName", "lastName", "profilePicture"] }).exec();
        res.status(200).json(user.followers)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

//GET FOLLOWINGS
router.get("/followings/:userId", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({ path: "followings", select: ["userName", "firstName", "lastName", "profilePicture"] }).exec();
        res.status(200).json(user.followings)
    } catch (error) {
        res.status(500).json(error.message)
    }
})
module.exports = router;