import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { styled } from 'styled-components'
// import { apiCallStart } from '../redux/UserSlice'
import { userRequest } from '../requestMetohd'
import { apiCallStart } from '../redux/UserSlice'


const OnlineUser = styled.div`
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
const UserName = styled.span`
font-size: 15px;
font-weight: 400;
cursor: pointer;
`

 const OnlineUsers = ({userId}) => {
    const dispatch = useDispatch()
    const[onlineUser,setOnlineUser] = useState({})
    useEffect(()=>{
        const getUser = async()=>{
            dispatch(apiCallStart())
            try {
                const res = await userRequest.get(`/users/find/${userId}`)
                setOnlineUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    },[userId,dispatch])
    // console.log(userId,onlineUser)
    return (
        <>
            <OnlineUser >
                <OnlineUserImg src={onlineUser?.profilePicture ? onlineUser.profilePicture : 'http://localhost:5000/static/profilePic.png'} />
                <CircleOnline></CircleOnline>
                <UserName>{onlineUser?.userName}</UserName>
            </OnlineUser></>
    )
}

export default OnlineUsers