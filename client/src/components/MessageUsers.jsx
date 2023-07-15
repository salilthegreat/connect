import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from "styled-components"
import { apiCallStart } from '../redux/UserSlice'
import { userRequest } from '../requestMetohd'

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

const MessageUsers = ({ convo }) => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const friendId = convo?.members.filter((item) => item !== currentUser._id)[0]
    const [friend, setFriend] = useState({})
    // console.log(friendId)
    useEffect(() => {
        const GetUser = async () => {
            dispatch(apiCallStart())
            try {
                const res = await userRequest.get(`/users/find/${friendId}`)
                setFriend(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        GetUser();
    }, [friendId])
    return (
        <>
            <Users >
                <UserImg src={friend?.profilePictur ? friend.profilePictur : 'http://localhost:5000/static/profilePic.png'} />
                <UserName>{friend?.userName}</UserName>
            </Users>
        </>
    )
}

export default MessageUsers