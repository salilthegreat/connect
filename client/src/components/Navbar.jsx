import React, { Fragment } from 'react'
import { styled } from 'styled-components'
import {Home,Notifications, Message, Person, Search} from "@mui/icons-material"

const Nav = styled.nav`
    height: 50px;
    background-color: #cbc9c9;
    display: flex;
    justify-content:space-between;
    align-items: center;  
    position:sticky ;
    top: 0;
    width: 100%;
    z-index: 10;
    `
const LeftNav = styled.aside`
display: flex;
align-items: center;
`
const Logo = styled.img`
    height: 40px;
    width: 40px;
    transform: scaleX(-1);
`
const SearchBox = styled.div`
display: flex;
align-items: center;
position: relative;
`

const SearchBar = styled.input`
 width: 100%;
 height: 15px;
 border-radius: 13px;
 padding: 5px 25px;
 border: 1px solid gray;
 font-weight: 300;
 font-size: 13px;
 outline: none;

`
const MiddleNav = styled.div`
display: flex;
align-items: center;

`
const LinkWrapper = styled.div`
display: flex;
align-items: center;
margin-right: 40px;
font-weight: 400;
font-size: 13px;
color: white;
border-radius: 10px;
padding: 0px 10px;
cursor: pointer;
&:hover{
    background-color: #b4f3f3;
    color: black;
}
`
const Badges = styled.span`
     margin-left: 5px;
     width: 20px;
     height: 20px;
     border-radius: 50%;
     background-color:lightblue;
     display: flex;
     align-items: center;
     justify-content: center;
`

const RightNav = styled.div``
const Profile = styled.div`
display: flex;
align-items: center;
margin-right: 15px;
gap: 15px;
`
const ProfilePic = styled.img`
width: 32px;
height: 32px;
border-radius:50%;
object-fit: cover;
`
const Name = styled.span`
font-weight: 400;
font-size: 13px;
color: white;
`

const Navbar = () => {
  return (
    <Fragment>
        
        <Nav>
            <LeftNav>
                <Logo src='https://cdn.pixabay.com/photo/2014/04/09/17/48/man-320276_1280.png'></Logo>
                <SearchBox>
                <SearchBar placeholder='Search for...'></SearchBar>
                <Search style={{position:"absolute",height:"18px",color:"grey"}} />
                </SearchBox>
            </LeftNav>
            <MiddleNav>
                <LinkWrapper><Home style={{marginRight:"5Px",height:"18px",color:"grey"}}/>Home</LinkWrapper>
                <LinkWrapper><Person style={{marginRight:"5Px",height:"18px",color:"grey"}}/>Profile</LinkWrapper>
                <LinkWrapper><Notifications style={{marginRight:"5Px",height:"18px",color:"grey"}}/>Notifications<Badges>11</Badges></LinkWrapper>
                <LinkWrapper><Message style={{marginRight:"5Px",height:"18px",color:"grey"}}/>Messages<Badges>3</Badges></LinkWrapper>
            </MiddleNav>
            <RightNav>
                <Profile>
                    <ProfilePic src='https://images.unsplash.com/photo-1602442787305-decbd65be507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'></ProfilePic>
                    <Name>Jane Doe</Name>
                </Profile>
            </RightNav>
        </Nav>
    </Fragment>
  )
}

export default Navbar