import { Cancel, GifBox, Image, VideoLibrary } from '@mui/icons-material'
import React, { Fragment, useState } from 'react'
import { styled } from 'styled-components'
import { NewPost } from '../redux/apiCalls'
import { useDispatch } from 'react-redux'
import {  userRequest } from '../requestMetohd'

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
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
const PostDesc = styled.input`
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
&:disabled{
    background-color: red;
}
`
const ImgContainer = styled.div`
display: flex;`
const PreviewImg = styled.img`
width: 100%;
height: 300px;
object-fit: contain;
`
const VidContainer = styled.div`
display: flex;
`
const ClearPreview = styled.span`

`
const PreviewVid = styled.video`
width: 100%;
height: 300px;
object-fit: contain;`

const CreatePost = () => {
    const[uploading,setUploading] = useState(false)
    const validPost = new RegExp(/^\S/)
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState(null)
    const [post, setPost] = useState({
        description: ""
    });
    const newPost = {
        description:post.description
    }
    const dispatch = useDispatch()
    // const uploading = false;

    const handlePost = async (e) => {
        e.preventDefault();
        if(file){
            setUploading(true)
            const data = new FormData();
            const fileName = new Date().getTime() + file.name;
            data.append("name",fileName)
            data.append("file",file)
            try {
                const res = await userRequest.post("/upload",data);
                console.log(res.data.file)
                newPost.img = res.data.file;
            } catch (error) {
                console.log(error)
            }
            setUploading(false)
        }
        NewPost(dispatch, newPost);
        setPost({ description: "" })
        setFile(null)
    }
    console.log(post)
    // console.log(file)
    return (
        <Fragment>
            <MainDiv>
                <Top>
                    <ProfilePic src='https://images.unsplash.com/photo-1602442787305-decbd65be507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80'></ProfilePic>
                    <PostDesc name='description' value={post.description} onChange={(e) => setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }))} placeholder={"What's on your mind..."}></PostDesc>
                </Top>
                {file && <ImgContainer>
                    <PreviewImg src={URL.createObjectURL(file)} />
                    <ClearPreview>
                        <Cancel onClick={(e) => setFile(null)} />
                    </ClearPreview>
                </ImgContainer>}
                {video && <VidContainer>
                    <PreviewVid src={URL.createObjectURL(video)} controls />
                    <ClearPreview>
                        <Cancel onClick={(e) => setVideo(null)} />
                    </ClearPreview>
                </VidContainer>}
                <Hr />
                <Bottom>
                    <BottomLeft>
                        <IconHolder>
                            <Label htmlFor="image"> <Image style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Images
                            <Input name='image' id='image' type='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </IconHolder>
                        <IconHolder>
                            <Label htmlFor="video"> <VideoLibrary style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Videos
                            <Input name='video' id='video' type='file' accept='.mp4,.mov' onChange={(e) => setVideo(e.target.files[0])} />

                        </IconHolder>
                        <IconHolder>
                            <Label htmlFor="gif" > <GifBox style={{ marginRight: "5Px", height: "18px", color: "grey" }} /></Label>
                            Gifs
                            <Input name='gif' id='gif' type='file' accept='.gif' onChange={(e) => setFile(e.target.files[0])} />
                        </IconHolder>
                    </BottomLeft>
                    <BottomRight>
                        <PostButton onClick={handlePost} disabled={!validPost.test(post.description) || uploading}   >{uploading ? "posting":"Post"}</PostButton>
                        {/* <PostButton onClick={handlePost} disabled={progress>0 && progress<100}   >{loading ? "posting":"Post"}</PostButton> */}
                    </BottomRight>
                </Bottom>
            </MainDiv>
        </Fragment>
    )
}

export default CreatePost