import React, { Fragment, useState } from 'react'
import { styled } from 'styled-components'
import { Home, Notifications, Message, Person, PowerSettingsNew } from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../redux/UserSlice'
import { Link, useNavigate } from 'react-router-dom'
import { userRequest } from '../requestMetohd'

const Nav = styled.nav`
    position: relative;
    height: 50px;
    background-color: var(--primary-blue);
    display: flex;
    justify-content:space-between;
    align-items: center;  
    position:sticky ;
    top: 0;
    width: 100%;
    z-index: 10;
    padding: 0 10px;
    box-sizing: border-box;
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

const RightNav = styled.div`
display: flex;
align-items: center;
`

const LogOutButton = styled.button`
    padding: 0px;
    margin: 0px;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0px;
`

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
const NotificationModal = styled.div`
    position: absolute;
    top:50px;
    left: 35%;
    background-color: white;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:0px 20px;
    border-radius:5px;
`
const NotificationWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    border-bottom: 0.5px solid gray;
`
const NotificationPara = styled.p`
    font-weight: 300;
`
const NotificationSpan = styled.span`
    font-weight: 500;
    color: red;
`
const PostImagPic = styled.img`
width: 32px;
height: 32px;
object-fit: cover;
`

const Navbar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notifications, setNotifications] = useState([])
    const [show, setShow] = useState(false)
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logOut());
        localStorage.clear("persist:root")
        navigate("/")
        window.location.reload()
    }
    const handleNotification = async () => {
        setShow(!show)
        try {
            const res = await userRequest.get("/notifications");
            setNotifications(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(notifications)
    return (
        <Fragment>

            <Nav>
                <LeftNav>
                    <Logo src='https://cdn.pixabay.com/photo/2014/04/09/17/48/man-320276_1280.png'></Logo>
                </LeftNav>
                <MiddleNav>
                    <Link to={"/"} style={{ textDecoration: "none" }}><LinkWrapper><Home style={{ marginRight: "5Px", height: "18px", color: "grey" }} />Home</LinkWrapper></Link>
                    <Link to={`/profile/${currentUser?._id}`} style={{ textDecoration: "none" }}><LinkWrapper><Person style={{ marginRight: "5Px", height: "18px", color: "grey" }} />Profile</LinkWrapper></Link>
                    <LinkWrapper onClick={handleNotification}><Notifications style={{ marginRight: "5Px", height: "18px", color: "grey" }} />Notifications</LinkWrapper>
                    <Link to={"/message"} style={{ textDecoration: "none" }}><LinkWrapper><Message style={{ marginRight: "5Px", height: "18px", color: "grey" }} />Messages</LinkWrapper></Link>
                </MiddleNav>
                <RightNav>
                    <Profile>
                        <ProfilePic src={currentUser?.profilePicture ? currentUser.profilePicture : "http://localhost:5000/static/profilePic.png"}></ProfilePic>
                        <Name>{currentUser?.firstName + " " + currentUser?.lastName}</Name>
                    </Profile>
                    <LogOutButton onClick={handleLogout}>
                        <PowerSettingsNew style={{ height: "15px", padding: "0", margin: "0px" }} />
                    </LogOutButton>
                </RightNav>
                {show && <NotificationModal>
                    {notifications.map((notify) => (
                        <NotificationWrapper>
                            <ProfilePic src={notify.senderId.profilePicture} />
                            <NotificationPara>
                                {(notify.type === "liked") &&
                                    <>
                                        <Link style={{ textDecoration: "none" }} to={`/profile/${notify.senderId._id}`}><NotificationSpan>{notify.senderId.userName}</NotificationSpan></Link>  liked your post
                                    </>
                                }
                                {
                                    (notify.type === "commented") &&
                                    <>
                                        <Link style={{ textDecoration: "none" }} to={`/profile/${notify.senderId._id}`}><NotificationSpan>{notify.senderId.userName}</NotificationSpan></Link> commented on your post
                                    </>
                                }
                                {
                                    (notify.type === "followed") &&
                                    <>
                                        <Link style={{ textDecoration: "none" }} to={`/profile/${notify.senderId._id}`}><NotificationSpan>{notify.senderId.userName}</NotificationSpan></Link> started following you.
                                    </>
                                }
                            </NotificationPara>
                            {notify?.postId?.img && <PostImagPic src={notify.postId.img} />}
                        </NotificationWrapper>
                    ))}
                </NotificationModal>}
            </Nav>
        </Fragment>
    )
}

export default Navbar