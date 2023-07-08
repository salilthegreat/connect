import React, { Fragment } from 'react'
import styled from "styled-components"
import {Delete, Edit,} from "@mui/icons-material"

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
`
const CommentSection = styled.div`
    padding-left: 30px;
`

const CommentText = styled.p`
    font-weight: 400;
    font-size: 13px;
`
const EditComment = styled.div`
    
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
const Comment = ({comment}) => {

    return (
        <Fragment>
            <UserCommentsContainer>
                <UserComments>
                    <ProfileComment src='https://images.unsplash.com/photo-1482361046637-0226fdcfa3b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' />
                    <User>
                        <UserName>Daisy Leonheart</UserName>
                        <Time>1 minute ago</Time>
                    </User>
                </UserComments>
                <CommentSection>
                    <CommentText>{comment?.comment}</CommentText>
                    <EditComment>
                        <Edit style={{ marginRight: "5Px", height: "13px", color: "grey" }} />
                        <Delete style={{ marginRight: "5Px", height: "13px", color: "grey" }} />
                    </EditComment>
                </CommentSection>
            </UserCommentsContainer>
        </Fragment>
    )
}

export default Comment