import {
  Delete,
  Edit,
  Favorite,
  FavoriteBorder,
  InsertComment,
  MoreVert,
  Send,
} from "@mui/icons-material";
import React, { Fragment, useState } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";

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
const DeletePost = styled.button`
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
  object-fit: cover;
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

const Post = () => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [del, setDel] = useState(false);
  return (
    <Fragment>
      <MainDiv>
        {del && <DelteModal>
            <Ques>Are you sure?</Ques>
            <ButtonGroup>
                <KeepPost onClick={(e)=>setDel(!del)}>Keep</KeepPost>
                <DeletePost>Delete</DeletePost>
            </ButtonGroup>
            </DelteModal>}
        <UserSection>
          <UserSectionLeft>
            <ProfilePic src="https://plus.unsplash.com/premium_photo-1671586882920-8cd59c84cdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
            <UserDetails>
              <Name>Anna Parker</Name>
              <Time>1 minute ago</Time>
            </UserDetails>
          </UserSectionLeft>
          <UserSectionRight>
            <MoreVert
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              onClick={(e) => setEdit(!edit)}
            />
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
        <Text>Hello! there this is my new post</Text>
        {showInput && (
          <InputWrapper>
            <EditInput defaultValue={`Hello! there this is my new post`} />
            <Send
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              onClick = {(e)=>setShowInput(!showInput)}
            />
          </InputWrapper>
        )}
        <ImageWrapper>
          <Image src="https://plus.unsplash.com/premium_photo-1671586882920-8cd59c84cdfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"></Image>
        </ImageWrapper>
        <Bottom>
          <BottomHolder onClick={(e) => setLiked(!liked)}>
            {liked ? (
              <Favorite
                style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              />
            ) : (
              <FavoriteBorder
                style={{ marginRight: "5Px", height: "18px", color: "grey" }}
              />
            )}
            <Counts>5 likes</Counts>
          </BottomHolder>
          <BottomHolder onClick={(e) => setShowComments(!showComments)}>
            <InsertComment
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
            />
            <Counts>2 comments</Counts>
          </BottomHolder>
        </Bottom>
        <Hr />
        <CommentsContainer>
          <CurrentUserComment>
            <ProfileComment src="https://images.unsplash.com/photo-1602442787305-decbd65be507?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
            <Input type="text" placeholder="Write a comment..." />
            <Send
              style={{ marginRight: "5Px", height: "18px", color: "grey" }}
            />
          </CurrentUserComment>
          {showComments && (
            <CommentGroup>
              <Comment />
              <Comment />
            </CommentGroup>
          )}
        </CommentsContainer>
      </MainDiv>
    </Fragment>
  );
};

export default Post;
