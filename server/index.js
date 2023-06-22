const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const authRoute = require("./routes/auth")

const app = express();


dotenv.config();

app.use(express.json())
app.use(morgan("common"))
app.use(helmet())
app.use(cors())

app.use("/api/auths",authRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("DB connected successfully")
}).catch((err) =>
    console.log(err))
app.get("/",(req,res)=>{
    res.status(200).json(req.body)
})

app.listen(5000, () => {
    console.log(`App is running at port http://localhost:5000`)
})