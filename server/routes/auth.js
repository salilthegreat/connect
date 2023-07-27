const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = require("express").Router();


//REGISTER
router.post("/register", async (req, res) => {
    const {  email, password } = req.body;
    // let user = await User.findOne({ userName });
    // if (user) return res.status(401).json("Username already taken")
     let user = await User.findOne({ email });
    if (user) return res.status(401).json("Email already Taken")
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ ...req.body, password: hashedPassword });
        const savedUser = await newUser.save();
        const accessToken = createAccessToken({userId:savedUser._id,isAdmin:savedUser.isAdmin})
        res.status(200).json({...savedUser._doc,accessToken})
    } catch (error) {
        res.status(500).json(error.message)
    }

})

//jwt creating functions
const createAccessToken = ({ userId, isAdmin }) => {
    // return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" })
    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET)
}
const createRefreshToken = ({ userId, isAdmin }) => {
    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET)
}

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json("Email dosen't exist");
        let isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json("Password invalid")
        const accessToken =  createAccessToken({ userId:user._id, isAdmin: user.isAdmin })
        const refreshToken = createRefreshToken({ userId:user._id, isAdmin: user.isAdmin })
        res.status(200).json({ ...user._doc, accessToken, refreshToken })
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router