import { GifBox, Image, VideoLibrary } from '@mui/icons-material'
import React, { Fragment } from 'react'
import { styled } from 'styled-components'

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 120px;
    background-color: #ebe7e7;
    -webkit-box-shadow: 0px -1px 16px -3px #000000; 
    border-radius: 10px;
    box-shadow: 0px -1px 16px -3px #000000;
`
const Top = styled.div`
display: flex;
gap: 20px;
margin-bottom: 30px;
`
const ProfilePic = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`
const SearchBar = styled.input`
width: 90%;
border-radius: 20px;
border: 1px solid grey;
outline: none;
padding: 0px 20px;
font-weight: 300;
`
const Hr = styled.hr`
    height: 0.5px;
`
const Bottom = styled.div`
margin-top: 30px;
display: flex;
justify-content: space-between;
`
const BottomLeft = styled.div`
display: flex;
gap: 50px;
`
const IconHolder = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-weight: 400;
font-size: 13px;
`
const Input = styled.input`
display: none;
`
const Label = styled.label``
const BottomRight = styled.div``
const PostButton = styled.button`
border:none;
background-color: #8a9498;
padding: 7px 15px;
border-radius: 10px;
font-weight: 300;
font-size: 13px;
color: white;
cursor: pointer;
`


const CreatePost = () => {
    return (
        <Fragment>
            <MainDiv>
                <Top>
                    <ProfilePic src='https://images.unsplash.com/photo-1602442787305-decbd65be507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'></ProfilePic>
                    <SearchBar placeholder={"What's on your mind..."}></SearchBar>
                </Top>
                <Hr />
                <Bottom>
                    <BottomLeft>
                        <IconHolder>
                            <Label htmlFor="image"> <Image style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Images
                            <Input name='image' id='image' type='file' accept='.png,.jpeg,.jpg' />
                        </IconHolder>
                        <IconHolder>
                            <Label htmlFor="video"> <VideoLibrary style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Videos
                            <Input name='video' id='video' type='file' accept='.mp4,.mov' />

                        </IconHolder>
                        <IconHolder>
                            <Label htmlFor="gif" > <GifBox style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Gifs
                            <Input name='gif' id='gif' type='file' accept='.gif' />
                        </IconHolder>
                    </BottomLeft>
                    <BottomRight>
                        <PostButton>Post</PostButton>
                    </BottomRight>
                </Bottom>
            </MainDiv>
        </Fragment>
    )
}

export default CreatePost