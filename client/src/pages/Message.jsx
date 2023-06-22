import React, { Fragment, useState } from 'react'
import Navbar from "../components/Navbar"
import styled from "styled-components"
import { Search } from '@mui/icons-material'

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

const Users = styled.div`
display: flex;
align-items: center;
gap: 30px;
`

const UserImg = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`

const UserName = styled.span`
font-size: 15px;
font-weight: 400;
cursor: pointer;
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

const OnlineUsers = styled.div`
display: flex;
align-items: center;
gap: 30px;
position: relative;
`

const OnlineUserImg = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
border: 1px solid green;
object-fit: cover;
cursor: pointer;
`
const CircleOnline = styled.span`
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: green;
    top: 0;
    left: 28px;
`

const Message = () => {

    const [conversation,setConversation] = useState(null)

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
                        <UserProfiles>
                            <Users onClick={()=>setConversation(true)}>
                                <UserImg src='https://images.pexels.com/photos/1028927/pexels-photo-1028927.jpeg?auto=compress&cs=tinysrgb&w=800' />
                                <UserName>Lily Leonhart</UserName>
                            </Users>
                            <Users>
                                <UserImg src='https://images.pexels.com/photos/1028927/pexels-photo-1028927.jpeg?auto=compress&cs=tinysrgb&w=800' />
                                <UserName>Lily Leonhart</UserName>
                            </Users>
                            
                        </UserProfiles>
                    </LeftWrapper>
                </Left>

                {/* Message Section */}

                <Middle>
                    <MiddleWrapper>
                        {conversation ? <>
                        <MessageTop>
                            <MessageContainer>
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage>Hey, It's been a while,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere eius itaque consequatur minus accusantium tenetur omnis, inventore exercitationem at obcaecati, voluptas quasi. Ullam, necessitatibus aliquid sint voluptas velit officia error!</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer own={true}>
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage own={true}>Can we talk ? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, neque eius! Consectetur natus id cupiditate quos quod tempore quasi exercitationem. Eveniet aspernatur ex quibusdam beatae pariatur, exercitationem ipsa aut repellat.</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer own={true}>
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage own={true} >Can we talk ? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, neque eius! Consectetur natus id cupiditate quos quod tempore quasi exercitationem. Eveniet aspernatur ex quibusdam beatae pariatur, exercitationem ipsa aut repellat.</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer >
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage  >Daijobu kai, mada mada</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer >
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage  >Daijobu kai, mada mada</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer own={true}>
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage own={true} >Can we talk ? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, neque eius! Consectetur natus id cupiditate quos quod tempore quasi exercitationem. Eveniet aspernatur ex quibusdam beatae pariatur, exercitationem ipsa aut repellat.</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                            <MessageContainer own={true}>
                                <MessageWrapper>
                                    <UserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80' />
                                    <UserMessage own={true} >Can we talk ? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, neque eius! Consectetur natus id cupiditate quos quod tempore quasi exercitationem. Eveniet aspernatur ex quibusdam beatae pariatur, exercitationem ipsa aut repellat.</UserMessage>
                                </MessageWrapper>
                                <TimeAgo>6 min ago</TimeAgo>
                            </MessageContainer>
                        </MessageTop>
                        <MessageBottom>
                            <MessageArea rows={5}/>
                            <SendButton>Send</SendButton>
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
                            <OnlineUsers onClick={()=>setConversation(true)}>
                                <OnlineUserImg src='https://images.unsplash.com/photo-1486486704382-8ee6f7754a45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80' />
                                <CircleOnline></CircleOnline>
                                <UserName>Alicia Silverstone</UserName>
                            </OnlineUsers>
                        </OnlineProfiles>
                        </OnlineWrapper>
                    </RightWrapper>
                </Right>
            </Container>
        </Fragment>
    )
}

export default Message