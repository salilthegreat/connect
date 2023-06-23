const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json("Invalid Token")
            }
            req.user = user;
            next()
        });
    } else {
        return res.status(401).json("you are not authenticated");
    }

}

const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.userId === req.params.id || req.user.isAdmin){
            next()
        }else{
            return res.status(403).json("You are not allowed to do this")
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin ){
            next()
        }else {
            return res.status(403).json("You are not allowed to do that")
        }
    })
}




module.exports = { verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin }