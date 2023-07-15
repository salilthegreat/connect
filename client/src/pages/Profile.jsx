import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";
import LeftBar from "../components/LeftBar";
import Middle from "../components/MIddle";
import Rightbar from "../components/Rightbar";
import { Add, LocationOn, Message } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../requestMetohd";
import { apiCallStart } from "../redux/UserSlice";
import { Follow } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
`;
const ProfileRight = styled.div`
  display: flex;
  flex: 4.5;
  flex-direction: column;
`;
const ProfileRightTop = styled.div``;
const UserImages = styled.div`
  position: relative;
  margin-bottom: 30px;
`;
const CoverPic = styled.img`
  width: 100%;
  height: 30vh;
  object-fit: cover;
`;
const ProfilePic = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border:2px solid pink;
  object-fit: cover;
  position: absolute;
  bottom: -30px;
  right: 0;
  left: 0;
  margin: auto;
`;
const UserDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 5px;
`;
const FullName = styled.h1`
font-size: 20px;
`;
const UserName = styled.span`
font-weight: 300;
font-size: 11px;
`;

const UserProfession = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 11px;
`

const UserLocation = styled.div`
  font-size: 11px;
  font-weight: 400;
  display: flex;
  align-items: center;
`
const UserButtons = styled.div`
margin: 10px;
display: flex;
gap: 20px;
`

const UserButton = styled.button`
display: flex;
align-items: center;
padding: 5px ;
border-radius: 5px;
border: ${(props) => props.border ? "1px solid gray" : "none"};
background-color: ${props => props.bgcolor || "none"};
color: ${props => props.color || "black"};
font-size: 13px;
font-weight: 400;
cursor: pointer;
`

const ProfileRightBottom = styled.div`
  display: flex;
`;

const Profile = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const { currentUser } = useSelector((state) => state.user)
  const [myProfile,setMyProfile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const GetUser = async () => {
      dispatch(apiCallStart());
      try {
        const res = await userRequest.get(`/users/find/${params.userId}`);
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    GetUser();
  }, [params])

  useEffect(()=>{
    setMyProfile(currentUser?._id === params?.userId)
  },[currentUser,params])
  console.log(currentUser?._id,user?._id)
  // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken)
const handleFollow = () => {
  Follow(dispatch,params.userId)
}

const handleConversation = async()=>{
  dispatch(apiCallStart());
  try {
    const res = await userRequest.post('/conversations',{senderId:currentUser?._id,recieverId:user?._id})
    console.log(res.data)
    res && navigate("/message")
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Fragment>
      <Navbar />
      <Container>
        <LeftBar />
        <ProfileRight>
          <ProfileRightTop>
            <UserImages>
              <CoverPic src="https://images.unsplash.com/photo-1483884105135-c06ea81a7a80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />
              <ProfilePic src="https://images.unsplash.com/photo-1485396003708-e7a7ad32484f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2117&q=80" />
            </UserImages>
            <UserDetails>
              <FullName>{user?.firstName + " " + user?.lastName}</FullName>
              <UserName>@{user?.userName}</UserName>
              <UserProfession>Product Designer</UserProfession>
              <UserLocation><LocationOn style={{ height: "14px", color: "gray" }} />Colorado, United States</UserLocation>
              <UserButtons>
                {myProfile ? 
                <UserButton bgcolor="grey" color="white">Update<Message style={{ height: "14px", color: "white" }} /></UserButton>
                : <>  
                <UserButton border="true" onClick={handleFollow} >{currentUser?.followings?.includes(params?.userId) ? "Unfollow" : "Follow" } <Add style={{ height: "14px" }} /></UserButton>
                  <UserButton bgcolor="grey" color="white" onClick={handleConversation}>Message<Message style={{ height: "14px", color: "white" }} /></UserButton>
                </> 
                }
              </UserButtons>
            </UserDetails>
          </ProfileRightTop>
          <ProfileRightBottom>
            <Middle profile={true} />
            <Rightbar profile="profile" user={user} />
          </ProfileRightBottom>
        </ProfileRight>
      </Container>
    </Fragment>
  );
};

export default Profile;
