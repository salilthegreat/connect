import React, { Fragment, useEffect, useRef, useState } from 'react'
import Navbar from "../components/Navbar"
import styled from "styled-components"
import { Search } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { apiCallStart } from '../redux/UserSlice'
import { userRequest } from '../requestMetohd'
import MessageUsers from '../components/MessageUsers'
import MessageBubbles from '../components/MessageBubbles'
import {io} from "socket.io-client"
import OnlineUsers from '../components/OnlineUsers'

const Container = styled.div`
display: flex;
height: calc(100vh - 50px);
position: relative;
`
const Left = styled.div`
flex: 1.5;
height: 100%;
background-color: whitesmoke;

`
const LeftWrapper = styled.div`
padding: 20px;
height: 100%;
box-sizing: border-box;
`
const LeftTop = styled.div`

`

const Header = styled.h1`
    font-weight: 500;
    font-size: 18px;
`


const SearchWrapper = styled.div`
display: flex;
align-items: center;
position: relative;
margin: 20px 0px;
`

const SearchInput = styled.input`
width: 80%;
padding: 5px 10px;
border-radius: 15px;
border: 1px solid gray;
outline: none;
font-weight: 400;
font-size: 13px;
`

const UserProfiles = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
gap: 20px;
height: 85%;
overflow-y: scroll;
`




const Middle = styled.div`
flex: 3;
background-color: whitesmoke;
height: 100%;
`
const MiddleWrapper = styled.div`
padding: 20px;
height: 100%;
box-sizing: border-box;
border-right:0.5px solid gray;
border-left:0.5px solid gray;


`
const MessageTop = styled.div`
height:calc(100% - 90px) ;
overflow-y: scroll;
`



const MessageBottom = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`

const MessageArea = styled.textarea`
width: 80%;
padding: 10px;
`

const SendButton = styled.button`
padding: 10px 10px;
border-radius: 10px;
background-color: lightgray;
color: white;
border: 1px solid gray;
outline: none;

`

const NoCoversation = styled.h1`
font-weight: 500;
opacity: 0.5;
height: 100%;
/* text-align: center; */
display: flex;
justify-content: center;
align-items: center;
`

const Right = styled.div`
flex: 1.5;
background-color: whitesmoke;

`
const RightWrapper = styled.div`
padding: 20px;
height: 100%;
box-sizing: border-box;

`

const OnlineWrapper = styled.div`
height: calc(100% - 35px);

`

const OnlineProfiles = styled.div`
margin-top: 20px;
display: flex;
flex-direction: column;
height: 100%;
gap: 20px;
overflow-y: scroll;
`


const Message = () => {
    
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user)
    const [conversation, setConversation] = useState(null)
    const [chat,setChat] = useState([])
    const [conversations, setConversations] = useState([])
    const[socketMessage,setSocketMessage] = useState(null)
    const[onlineUser,setOnlineUser] = useState([])
    const [newMessage,setNewMessage] = useState({
        conversationId:"",
        senderId:currentUser._id,
        message:""
    })
    const scrollRef = useRef()
   const socket = useRef(null)

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage",(data)=>{
            setSocketMessage( {
                conversationId:setNewMessage.conversationId,
                senderId:data.senderId,
                message:data.message,
                createdAt:Date.now()
            })
            
        })
    },[])

    
    useEffect(()=>{
        // console.log(socketMessage,"aap")
        // console.log(conversation,"app2")
        conversation?.members.includes(socketMessage?.senderId) &&
        setChat(prev=>[...prev,socketMessage])

    },[socketMessage,conversation])

    useEffect(()=>{
        socket?.current?.emit("addUser",currentUser?._id)
        socket?.current?.on("getUser",users=>{
            setOnlineUser(()=> {return users.filter((u)=>u.userId !== currentUser?._id)})
        })
    },[currentUser])


    //to set the user list at left bar for all the users that the current user has communicated with
    useEffect(() => {
        const UserConversation = async () => {
            dispatch(apiCallStart());
            try {
                const res = await userRequest.get(`/conversations/${currentUser?._id}`);
                // console.log(res.data)
                setConversations(res.data.sort((a,b)=> ( new Date(b.createdAt) - new Date(a.createdAt))))
            } catch (error) {
                console.log(error)
            }
        };
        UserConversation()
    }, [currentUser,dispatch])

    //for scrolling of the screen to the current message

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[chat])

    //to fetch the messages after the current user clicks on any of the listed user

        const GetMessages = async(convo) => {
            setConversation(convo) //to find the reciever id in the conversation before sending message
        
            setNewMessage((prev)=>({...prev,"conversationId":convo._id}))  //it is set so that we can set up the conversatinid while recieving the message from socket
            dispatch(apiCallStart());
        try {
            const res = await userRequest.get(`/messages/${convo._id}`);
            setChat(res.data)
        } catch (error) {
            console.log(error)
        }
        }

// console.log(newMessage)

//sending message when clicked on the send

        const handleSend = async() => {
            const recieverId = conversation?.members?.find((m)=>m!==currentUser?._id) //this will be sent to socket server for instant messaging
            onlineUser.some((user)=>user.userId === recieverId) &&(
                socket.current.emit("sendMessage",{
                    senderId:currentUser._id,
                    message:newMessage.message,
                    recieverId
                })
            )
            dispatch(apiCallStart());
            setNewMessage((prev)=>({...prev,"message":""}))
            try {
                const res = await userRequest.post('/messages',newMessage);
                setChat([...chat,res.data])
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        // console.log(onlineUser,"gote")

        const handleOnlineConversation = async(recieverId) => {
            
            try {
                const res = await userRequest.get(`/conversations/${currentUser?._id}/${recieverId}`);
                GetMessages(res.data)
            } catch (error) {
                console.log(error)
            }
            
        }

    return (
        <Fragment>
            <Navbar />
            <Container>
                <Left>
                    <LeftWrapper>
                        <LeftTop>
                            <Header>Recent Chats</Header>
                            <SearchWrapper>
                                <SearchInput placeholder='Search for friends...' />
                                <Search style={{ position: "absolute", right: "55px", height: "15px", color: "gray" }} />
                            </SearchWrapper>
                        </LeftTop>
                        <UserProfiles >
                            {conversations.map((convo) => (
                                <div onClick={()=>GetMessages(convo)}>
                                <MessageUsers convo={convo} key={convo._id} />
                                </div>
                            ))}
                        </UserProfiles>
                    </LeftWrapper>
                </Left>

                {/* Message Section */}

                <Middle>
                    <MiddleWrapper>
                        {conversation ? <>
                            <MessageTop>
                                {chat?.map((message)=>( 
                                    <div ref={scrollRef}>
                                        <MessageBubbles message={message} key={message?._id} />
                                        </div>  
                                ))}
                            </MessageTop>
                            <MessageBottom>
                                <MessageArea rows={5} name='message' value={newMessage?.message} onChange={(e)=>setNewMessage((prev)=> ({...prev,[e.target.name]:e.target.value}))}/>
                                <SendButton onClick={handleSend}>Send</SendButton>
                            </MessageBottom>
                        </>
                            : <NoCoversation>Select a chat ,to start a conversation</NoCoversation>}
                    </MiddleWrapper>
                </Middle>
                <Right>
                    <RightWrapper>
                        <Header>Online Friends</Header>
                        <OnlineWrapper>
                            <OnlineProfiles>
                                {onlineUser?.map((user)=>(
                                    <div onClick={() => handleOnlineConversation(user.userId)}>

                                        <OnlineUsers userId={user.userId}/>
                                    </div>
                                // <OnlineUser onClick={() => handleOnlineConversation(user.userId)}>
                                //     <OnlineUserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80' />
                                //     <CircleOnline></CircleOnline>
                                //     <UserName>Alicia Silverstone</UserName>
                                // </OnlineUser>
                                ))}
                            </OnlineProfiles>
                        </OnlineWrapper>
                    </RightWrapper>
                </Right>
            </Container>
        </Fragment>
    )
}

export default Message