import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {styled} from 'styled-components'
import ReactTimeAgo from 'react-time-ago'

const MessageContainer = styled.div`
margin-bottom: 15px;
display: flex;
flex-direction: column;
gap: 10px;
align-items: ${props => props.own ? "flex-end" : "flex-start"};
`

const MessageWrapper = styled.div`
display: flex;
gap: 15px;
`

const UserImg = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`

const UserMessage = styled.div`
    font-weight: 300;
    border-radius: 20px;
    padding: 10px 10px;
    max-width: 300px;
    background-color: ${props => props.own ? "white" : "lightgray"};
    color: ${props => props.own ? "black" : "white"};
    `

const TimeAgo = styled.span`
    font-weight: 300;
    font-size: 11px;
    `

const MessageBubbles = ({message}) => {
    const {currentUser} = useSelector((state)=>state.user)
    const myMessage = currentUser?._id === message?.senderId?._id || currentUser?._id === message?.senderId
        // console.log(message)
    return (
        <MessageContainer  own={myMessage} >
            <MessageWrapper>
                <UserImg src={message.senderId?.profilePicture ? message.senderId.profilePicture : 'http://localhost:5000/static/profilePic.png'} />
                <UserMessage>{message.message}</UserMessage>
            </MessageWrapper>
            <TimeAgo><ReactTimeAgo date={Date.parse(message.createdAt)} locale="en-US"/></TimeAgo>
        </MessageContainer>
    )
}

export default MessageBubbles