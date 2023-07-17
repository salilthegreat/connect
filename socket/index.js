const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
})

let User = []

const addUser = (userId,socketId) =>{
    !User.some((user)=>user.userId === userId ) && User.push({userId,socketId})
    console.log(User,"connect")
}

const removeUser = (socketId) =>{
   User = User.filter((user)=>user.socketId !== socketId)
    console.log(User,"disconnect")
}

const findUser = (recieverId) =>{
   return User.find((user)=>user.userId === recieverId)
}

io.on("connection",(socket)=>{
    
    console.log("A user connected")
    // io.emit("add","Let's become chat buddies")
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("getUser",User)
    })
    
    //Sending Message
    socket.on("sendMessage",({senderId,recieverId,message})=>{     
            const reciever = findUser(recieverId);
            io.to(reciever.socketId).emit("getMessage",({
                senderId,message
            }))
    })


    //when user gets disconnected
    socket.on("disconnect",()=>{
        removeUser(socket.id)
        io.emit("getUser",User)
        console.log("User disconnected")
    })
    

})

// const io = require("socket.io")(8900, {
//     cors: {
//         origin: "http://localhost:3000"
//     }
// });

// let users = [];

// const addUser = (userId, socketId) => {
//     !users.some(user => user.userId === userId) &&
//         users.push({ userId, socketId })

// }

// const removeUser = (socketId) => {
//     users = users.filter(user => user.socketId !== socketId)
// }

// const findUser = (userId) =>{
//     return users.find((user)=>user.userId === userId)
// }

// io.on("connection", (socket) => {
//     //When connected
//     console.log("a user connected");
//     //take userId and socketId from user
//     socket.on("addUser", userId => {
//         addUser(userId, socket.id)
//         io.emit("getUsers", users)
//     });

//     //Send and Get Messages
//     socket.on("sendMessage",({senderId,recieverId,message})=>{
//         const user = findUser(recieverId);
//         io.to(user.socketId).emit("getMessage",({message,senderId}))
//     })

//     //When disconnected
//     socket.on("disconnect", () => {
//         console.log("A user disconnected")
//         //remove use
//         removeUser(socket.id)
//         io.emit("getUsers", users)
//     })
// })