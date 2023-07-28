import {
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  InsertComment,
  MoreVert,
  Send,
} from "@mui/icons-material";
import React, { Fragment, useEffect, useState } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import { userRequest } from "../requestMetohd";
import { useDispatch, useSelector } from "react-redux";
import { apiCallError } from "../redux/UserSlice";
import ReactTimeAgo from 'react-time-ago'
import { CommentNotification, CreateComment, LikeFollowNotification } from "../redux/postApiCalls";
import { DeletePost, LikePost, UpdatePost } from "../redux/postApiCalls";
import { useNavigate } from "react-router-dom";

const DelteModal = styled.div`
  background-color: gray;
  height: 200px;
  width: 200px;
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Ques = styled.h1`
    color: black;
    font-weight: 700;
    font-size: 24px;
`
const ButtonGroup = styled.div`
display: flex;
gap: 10px;
`
const KeepPost = styled.button`
    padding: 5px 15px;
    border-radius: 15px;
    border: none;
    font-weight: 300;
    font-size: 11px;
`
const DeleteButton = styled.button`
    padding: 5px 15px;
    border-radius: 15px;
    border: none;
    font-weight: 300;
    font-size: 11px;
`

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  /* height: 600px; */
  margin: 20px 0px;
  padding: 20px;
  background-color: #ebe7e7;
  -webkit-box-shadow: 0px -1px 16px -3px #000000;
  box-shadow: 0px -1px 16px -3px #000000;
`;
const UserSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
`;
const UserSectionLeft = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const ProfilePic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.p`
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
`;
const Time = styled.span`
  font-weight: 300;
  font-size: 10px;
`;
const UserSectionRight = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 15px;
  margin-bottom: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;
const EditInput = styled.input`
  width: 90%;
  border-radius: 15px;
  border: 1px solid gray;
  outline: none;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 300;
`;
const ImageWrapper = styled.div`
  overflow: hidden;
  margin-bottom: 10px;
  height: 400px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;

  transition: all 1s ease-in-out;
  &:hover {
    /* scale: 1.1; */
  }
`;
const Bottom = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const BottomHolder = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Counts = styled.span`
  font-weight: 300;
  font-size: 13px;
`;
const CommentsContainer = styled.div`
  margin: 10px 0px;
`;

const CurrentUserComment = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const ProfileComment = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;
const Input = styled.input`
  /* display:none */
  width: 90%;
  border-radius: 15px;
  border: 1px solid gray;
  outline: none;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 300;
`;

const Hr = styled.hr`
  /* border:0.3px solid gray; */
`;
const CommentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Post = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user)

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [del, setDel] = useState(false);
  const [user, setUser] = useState({})
  const [description, setDescription] = useState({description:item?.description})
  const [comment, setComment] = useState({
    comment: ""
  })
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getUser = async () => {
      try {
        //  dispatch(apiCallStart()) 
        const res = await userRequest.get(`/users/find/${item?.userId}`);
        setUser(res.data)
      } catch (error) {
        dispatch(apiCallError(error.response.status))
        console.log(error)
      }
    }
    getUser();
  }, [item, dispatch])

  useEffect(()=>{
    setLiked(item?.likes.includes(currentUser?._id))
  },[item,currentUser])

  
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await userRequest.get(`/comments/${item?._id}`);
        setComments(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getComments();
  }, [item,showComments])
  
  
  const handleDelte = (postId) => {
    DeletePost(dispatch, postId, currentUser?._id)
    setDel(!del)
  }

  const handleUpdate = (postId) => {
    UpdatePost(dispatch, postId, currentUser?._id, description)
    setShowInput(!showInput)
  }

  const handleComment = (postId,recieverId) => {
    CreateComment(dispatch, postId, currentUser?._id, comment)
    setComment({
      comment: ""
    })
    const data = {
      type:"commented",
      senderId:currentUser?._id,
      recieverId,
      postId
    }
    CommentNotification(dispatch,data)
  }

  const handleLike = (postId,recieverId)=>{
    setLiked(!liked)
    LikePost(dispatch,postId,currentUser?._id)
    const data = {
      type:"liked",
      senderId:currentUser?._id,
      recieverId,
      postId
    }
    LikeFollowNotification(dispatch,data)
  }

  return (
    <Fragment>
      <MainDiv>
        {del && <DelteModal>
          <Ques>Are you sure?</Ques>
          <ButtonGroup>
            <KeepPost onClick={(e) => setDel(!del)} >Keep</KeepPost>
            <DeleteButton onClick={() => handleDelte(item?._id)}>Delete</DeleteButton>
          </ButtonGroup>
        </DelteModal>}
        <UserSection>
          <UserSectionLeft>
            <ProfilePic src={user?.profilePicture ? user?.profilePicture : "http://localhost:5000/static/profilePic.png"} onClick={()=>navigate(`/profile/${user._id}`)} />
            <UserDetails>
              <Name onClick={()=>navigate(`/profile/${user._id}`)}>{user?.userName}</Name>
              <Time><ReactTimeAgo date={Date.parse(item?.createdAt) || item?.createdAt} locale="en-US" /></Time>
            </UserDetails>
          </UserSectionLeft>
          <UserSectionRight>
            {(currentUser?._id === item?.userId) && <MoreVert
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              onClick={(e) => setEdit(!edit)}
            />}
            {edit && (
              <>
                <Delete
                  style={{ marginRight: "5Px", height: "18px", color: "grey" }}
                  onClick={(e) => setDel(!del)}
                />
                <Edit
                  style={{ marginRight: "5Px", height: "18px", color: "gray" }}
                  onClick={(e) => setShowInput(!showInput)}
                />
              </>
            )}
          </UserSectionRight>
        </UserSection>
        {!showInput && <Text>{description?.description}</Text>}
        {showInput && (
          <InputWrapper>
            <EditInput defaultValue={item?.description} name="description" onChange={(e) => setDescription({ [e.target.name]: e.target.value })} />
            <Send
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              onClick={() => handleUpdate(item._id)}
            />
          </InputWrapper>
        )}
        {item?.img && <ImageWrapper>
          <Image src={item?.img} loading="lazy" />
        </ImageWrapper>}
        <Bottom>
          <BottomHolder onClick={()=>handleLike(item?._id,item?.userId)}>
            {liked ? (
              <Favorite
                style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              />
            ) : (
              <FavoriteBorder
                style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              />
            )}
            <Counts>{item?.likes.length} likes</Counts>
          </BottomHolder>
          <BottomHolder onClick={(e) => setShowComments(!showComments)}>
            <InsertComment
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
            />
            <Counts>{comments.length} comments</Counts>
          </BottomHolder>
        </Bottom>
        <Hr />
        <CommentsContainer>
          <CurrentUserComment>
            <ProfileComment src={currentUser?.profilePicture ? currentUser?.profilePicture : "http://localhost:5000/static/profilePic.png"} />
            <Input type="text" name="comment" placeholder="Write a comment..." value={comment.comment} onChange={(e) => setComment({ [e.target.name]: e.target.value })} />
            <Send
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              onClick={() => handleComment(item?._id,item?.userId)}
            />
          </CurrentUserComment>
          {showComments && (
            <CommentGroup>
              {comments.map((comment) => (
                <Comment comment={comment}key={comment._id}/>
              ))}
            </CommentGroup>
          )}
        </CommentsContainer>
      </MainDiv>
    </Fragment>
  );
};

export default Post;
