import React, { Fragment, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "styled-components";
import LeftBar from "../components/LeftBar";
import Middle from "../components/MIddle";
import Rightbar from "../components/Rightbar";
import { Add, AddAPhoto, Facebook, Instagram, LinkedIn, LocationOn, Message } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { userRequest } from "../requestMetohd";
import { apiCallStart } from "../redux/UserSlice";
import { Follow, UpdateUser } from "../redux/apiCalls";
import Edit from "../components/Edit";


const Container = styled.div`
  display: flex;
  position: relative;
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

const UpdatePicInput = styled.input`
  display: none;
`

const UploadLabel = styled.label`
  
`
const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 20px;
  right: 45px;

`

const UploadButtons = styled.button`
  padding: 5px 5px;
  background-color:gray;
  border-radius: 5px;
  border: 1px solid black;
  margin-right: 5px;
`

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
const UserLinks = styled.div`
  display: flex;
  align-items: center;
`
const UserLink = styled.a`
color: darkblue;
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
  const [myProfile, setMyProfile] = useState(false)
  const navigate = useNavigate();
  const [coverPicture, setCoverPicture] = useState(null)
  const { currentUser } = useSelector((state) => state.user)
  const [profilePicture, setProfilePicture] = useState(null)
  const [uploading, setUploading] = useState(false)
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
    // eslint-disable-next-line
  }, [params])

  useEffect(() => {
    setMyProfile(currentUser?._id === params?.userId)
  }, [currentUser, params])
  // console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken)
  const handleFollow = () => {
    Follow(dispatch, params.userId)
  }

  const handleConversation = async () => {
    dispatch(apiCallStart());
    try {
      const res = await userRequest.post('/conversations', { senderId: currentUser?._id, recieverId: user?._id })
      res && navigate("/message")
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true)
    if (profilePicture) {
      const data = new FormData();
      const fileName = new Date().getTime() + profilePicture.name;
      data.append("name", fileName);
      data.append("file", profilePicture)
      try {
        const res = await userRequest.post('/upload', data);
        UpdateUser(dispatch, currentUser?._id, { profilePicture: res.data.file })
        setUploading(false)
      } catch (error) {
        console.log(error)
        setUploading(false)
      }
    }
    if (coverPicture) {
      const data = new FormData();
      const fileName = new Date().getTime() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture)
      try {
        const res = await userRequest.post('/upload', data);
        UpdateUser(dispatch, currentUser?._id, { coverPicture: res.data.file })
        setUploading(false)
      } catch (error) {
        console.log(error)
        setUploading(false)
      }
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
              <form action="">
                {coverPicture ? <CoverPic src={URL.createObjectURL(coverPicture)} /> : <CoverPic src={user?.coverPicture ? user.coverPicture : "https://www.solidbackgrounds.com/images/2560x1440/2560x1440-davys-grey-solid-color-background.jpg"} />}
                <UpdatePicInput id="coverPicInput" type="file" accept=".png,.jpg,.jpeg" onChange={(e) => setCoverPicture(e.target.files[0])} key={Date.now()} />
                <UploadLabel htmlFor="coverPicInput">
                  <AddAPhoto style={{ position: "absolute", right: '10px', bottom: '30px', color: 'white' }} />
                  {coverPicture && <ButtonWrapper>
                    <UploadButtons onClick={(e) => handleUpload(e)}>{uploading ? "Uploading" : "Upload"}</UploadButtons>
                    <UploadButtons>Cancel</UploadButtons>
                  </ButtonWrapper>}
                </UploadLabel>
                {profilePicture ? <ProfilePic src={URL.createObjectURL(profilePicture)} /> : <ProfilePic src={user?.profilePicture ? user.profilePicture : 'http://localhost:5000/static/profilePic.png'} />}
                <UploadLabel htmlFor="profilePicInput">
                  <AddAPhoto style={{ position: "absolute", right: '10px', bottom: '0px', color: 'red' }} />
                </UploadLabel>
                <UpdatePicInput id="profilePicInput" type="file" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
                {profilePicture && <ButtonWrapper>
                  <UploadButtons onClick={(e) => handleUpload(e)}>{uploading ? "Uploading" : "Upload"} </UploadButtons>
                  <UploadButtons onClick={() => setProfilePicture("")}>Cancel</UploadButtons>
                </ButtonWrapper>}
              </form>
            </UserImages>
            <UserDetails>
              {(user?.firstName || user?.lastName) &&<FullName>{user.firstName + " " + user.lastName}</FullName>}
              <UserName>{user?.userName && <span>@</span>}{user?.userName}</UserName>
              <UserProfession>{user?.profession}</UserProfession>
              <UserLocation>{(user?.currentCity || user?.country) && <LocationOn style={{ height: "14px", color: "gray" }} />}<span>{user?.currentCity}</span> {(user?.currentCity && user?.country) && <span>,</span>} <span>{user?.country}</span></UserLocation>
              <UserLinks>
               {user?.instagram && <UserLink href={user.instagram} target="_blank"><Instagram style={{height:"18px"}}/></UserLink> } 
               {user?.facebook && <UserLink href={user.facebook} target="_blank"><Facebook style={{height:"18px"}}/></UserLink> } 
               {user?.linkedIn && <UserLink href={user.linkedIn} target="_blank"><LinkedIn style={{height:"18px"}}/></UserLink> } 
              </UserLinks>
              <UserButtons>
                {myProfile ? <>
                  <UserButton bgcolor="grey" color="white">Update<Message style={{ height: "14px", color: "white" }} /></UserButton>
                  <Edit />
                </>
                  : <>
                    <UserButton border="true" onClick={handleFollow} >{currentUser?.followings?.includes(params?.userId) ? "Unfollow" : "Follow"} <Add style={{ height: "14px" }} /></UserButton>
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
