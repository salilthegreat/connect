const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const postRoute = require("./routes/post")
const commentRoute = require("./routes/comment")
const conversationRoute = require("./routes/conversation")
const messageRoute = require("./routes/message")
const notificationRoute = require("./routes/notification")

//imports for cloudinary
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const {CloudinaryStorage} = require("multer-storage-cloudinary")

const path = require("path")


const app = express();


dotenv.config();

app.use(express.json())
app.use(morgan("common"))
app.use(helmet())
app.use(cors())

//configuration for cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//making a storage 
const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"DEV"
    },
})

//assigning the storage we made from cloudinary to multer for uploadinf
const upload = multer({storage:storage})

//api call for file upload

app.post("/api/upload",upload.single("file"),(req,res)=>{
    try {
        res.status(200).json({file:req.file.path})
    } catch (error) {
        res.status(500).json(error.message)
    }
})

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/static',express.static(path.join(__dirname,'public')))
app.use("/api/auths", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments", commentRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/notifications",notificationRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected successfully")
}).catch((err) =>
    console.log(err))
app.get("/", (req, res) => {
    res.status(200).json(req.body)
})

app.listen(5000, () => {
    console.log(`App is running at port http://localhost:5000`)
})