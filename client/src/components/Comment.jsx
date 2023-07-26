import React, { Fragment, useEffect, useState } from 'react'
import styled from "styled-components"
import { Delete, Edit, Send, } from "@mui/icons-material"
import { apiCallError, apiCallStart } from '../redux/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userRequest } from '../requestMetohd'
import ReactTimeAgo from 'react-time-ago'
import { useNavigate } from 'react-router-dom'
import { DeleteComment, UpdateComment } from '../redux/postApiCalls'

const UserCommentsContainer = styled.div`
background-color: whitesmoke;
padding: 10px;
border-radius: 15px;
`
const UserComments = styled.div`
display: flex;
gap: 10px;
align-items: center;

`
const User = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`
const UserName = styled.span`
    font-weight: 300;
    font-size: 13px;
    cursor: pointer;
`
const CommentSection = styled.div`
    padding-left: 30px;
`

const CommentText = styled.p`
    font-weight: 400;
    font-size: 13px;
`
const EditCommentWrapper = styled.div`
    display: flex;
    align-items: center;
`
const EditComment = styled.div`
    width: 100%;
`
const EditInput = styled.input`
    width: 90%;
    border-radius: 15px;
    border: 1px solid gray;
    padding: 0px 10px;
`

const ProfileComment = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;`
const Time = styled.span`
font-weight: 300;
font-size: 10px;
`
const Comment = ({ comment }) => {
    const {currentUser} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [newComment, setNewComment] = useState(comment?.comment)
    const [edit, setEdit] = useState(false)
    const [post,setPost] = useState({})

    useEffect(() => {
        const getUser = async () => {
            try {
                dispatch(apiCallStart())
                const res = await userRequest.get(`/users/find/${comment?.userId}`);
                setUser(res.data)
            } catch (error) {
                dispatch(apiCallError(error.response.status))
                console.log(error)
            }
        }
        getUser();
    }, [comment, dispatch])

    useEffect(()=>{
        const getPost = async()=>{
            dispatch(apiCallStart);
            try {
                const res = await userRequest.get(`/posts/getone/${comment?.postId}`)
                setPost(res.data)
            } catch (error) {
                console.log(error)
            }
        } 
        getPost()
            
    },[comment,dispatch])

    const data = {
        commentId:comment?._id,
        userId:currentUser?._id,
        postId:comment?.postId
    }

    const handleEdit = () => {
        UpdateComment(dispatch,data,newComment)
        setEdit(!edit)
    }
    
    const handleDelete = () => {
        DeleteComment(dispatch,data)
    }

    
    return (
        <Fragment>
            <UserCommentsContainer>
                <UserComments>
                    <ProfileComment src={user?.profilePicture ? user.profilePicture : "http://localhost:5000/static/profilePic.png"} onClick={() => navigate(`/profile/${user._id}`)} />
                    <User>
                        <UserName onClick={() => navigate(`/profile/${user?._id}`)}>{user?.firstName + " " + user?.lastName}</UserName>
                        {/* <Time>1 minute ago</Time> */}
                        <Time><ReactTimeAgo date={Date.parse(comment?.createdAt) || comment?.createdAt} locale="en-US" /></Time>

                    </User>
                </UserComments>
                <CommentSection>
                    {/* {!edit && <CommentText >{comment?.comment}</CommentText>} */}
                    {!edit && <CommentText >{newComment}</CommentText>}
                    {edit && <EditCommentWrapper>
                        <EditInput defaultValue={comment?.comment} onChange={(e)=>setNewComment(e.target.value)}></EditInput>
                        <Send style={{ marginRight: "5Px", height: "13px", color: "grey" }} onClick={handleEdit}></Send>
                    </EditCommentWrapper>}
                    <EditComment>
                        {(currentUser?._id === user?._id) && <Edit style={{ marginRight: "5Px", height: "13px", color: "grey" }} onClick={() => setEdit(!edit)} />}
                    {(currentUser?._id === post?.userId?._id || currentUser?._id === comment?.userId) &&     <Delete style={{ marginRight: "5Px", height: "13px", color: "grey" }} onClick= {handleDelete}/>}
                    </EditComment>
                </CommentSection>
            </UserCommentsContainer>
        </Fragment>
    )
}

export default Comment