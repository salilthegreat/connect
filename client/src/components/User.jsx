import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { userRequest } from '../requestMetohd'
import { useDispatch } from 'react-redux'
import { apiCallStart } from '../redux/UserSlice'
import { useNavigate } from 'react-router-dom'

const Users = styled.div`
display: flex;
flex-direction: column;
align-items: center;
cursor: pointer;
`
const UserPic = styled.img`
height: 80px;
width: 80px;
border-radius: 20px;
object-fit: cover;
`
const UserName = styled.span`
font-weight: 400;
font-size: 13px;
`

const User = ({userId}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user,setUser] = useState({})

    useEffect(()=>{
        const GetUser = async() => {
            dispatch(apiCallStart())
            try {
                const res = await userRequest.get(`/users/find/${userId}`);
                console.log(res.data)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        GetUser()
    },[userId,dispatch])
    console.log(userId)
    return (
        <>
            <Users>
                <UserPic src={user?.profilePicture ? user.profilePicture : "http://localhost:5000/static/profilePic.png"} onClick={()=>navigate(`/profile/${user?._id}`)}/>
                <UserName onClick={()=>navigate(`/profile/${user?._id}`)}>{user?.userName}</UserName>
            </Users>
        </>
    )
}

export default User