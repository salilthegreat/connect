import { Edit, Facebook, Home, Instagram, LinkedIn, Message, Notifications, Person, Send, Settings } from '@mui/icons-material'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { UpdateUser } from '../redux/apiCalls'

const Container = styled.div`
    flex: 1.5;
    height: calc(100vh - 50px);
    /* background-color: blue; */
    /* overflow-y: scroll; */
    position: sticky;
    top: 60px;
    

`

const Wrapper = styled.div`
  padding: 20px;
`

const TopDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 30px;
padding: 20px;
background-color: #ebe7e7;
border-radius: 10px;
    /* -webkit-box-shadow: 0px -1px 16px -3px #000000;  */
    box-shadow: 0px 4px 12px 0px #155dec87;
`
const UserImg = styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`
const UserDetails = styled.div`
display: flex;
flex-direction: column;
cursor: pointer;
align-items: center;
`
const Username = styled.div`
font-weight: 500;
font-size: 14px;
`
const Location = styled.div`
font-weight: 300;
font-size: 10px;
`
const UpdateProfile = styled.div``
const MiddleDiv = styled.div`
display: flex;
flex-direction: column;
padding: 20px 20px;
margin-bottom: 30px;
column-gap: 40px;
row-gap: 10px;
/* padding-left: 30px; */
background-color: #ebe7e7;
    -webkit-box-shadow: 0px -1px 16px -3px #000000; 
    border-radius: 10px;
    box-shadow: 0px -1px 16px -3px #000000;

`
const LinkHolder = styled.div`
display: flex;
align-items: center;
font-size: 15px;
font-weight: 300;
gap: 10px;
border-radius: 15px;
padding:  5px;
color: gray;
cursor: pointer;
&:hover{
  background-color: lightgray;
}
`

const BottomDiv = styled.div`
padding: 20px;
  background-color: #ebe7e7;
    -webkit-box-shadow: 0px -1px 16px -3px #000000; 
    border-radius: 10px;
    box-shadow: 0px -1px 16px -3px #000000;

`
const Heading = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 15px;
`

const SocialHolder = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 0px;
cursor: pointer;
`
const ImageLink = styled.a``

const LeftBar = () => {

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const [showInputInsta, setShowInputInsta] = useState(false)
  const [showInputFb, setShowInputFb] = useState(false)
  const [showInputLin, setShowInputLin] = useState(false)
  const [updateData, setUpdateData] = useState({})

  const handleChange = (e) => {
    setUpdateData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const userId = currentUser?._id;

  const handleUpdate = (check) => {
    UpdateUser(dispatch,userId,updateData)
    if(check==="insta"){
      setShowInputInsta(!showInputInsta)
    } else if(check === "fb"){
      setShowInputFb(!showInputFb)
    }else if(check === "lIn"){
      setShowInputLin(!showInputLin)
    }
}


  return (
    <Fragment>
      <Container>
        <Wrapper>
          <TopDiv>
            <UserImg src={currentUser?.profilePicture ? currentUser.profilePicture : "http://localhost:5000/static/profilePic.png"} />
            <UserDetails>
              <Username>{currentUser?.firstName + " " + currentUser?.lastName}</Username>
              <Location><span>{ currentUser?.currentCity}</span> {(currentUser?.currentCity && currentUser?.country) && <span>,</span> }<span>{ currentUser?.country}</span></Location>
            </UserDetails>
            <UpdateProfile>
              <Settings style={{ color: "gray", fontSize: "18px" }} />
            </UpdateProfile>
          </TopDiv>

          <MiddleDiv>
            <Link to={"/"} style={{ textDecoration: "none" }}> <LinkHolder><Home style={{ height: "20px", color: "gray" }} />Home</LinkHolder></Link>
            <Link to={`/profile/${currentUser?._id}`} style={{ textDecoration: "none" }}><LinkHolder><Person style={{ height: "20px", color: "gray" }} />Profile</LinkHolder></Link>
            <Link to={"/"} style={{ textDecoration: "none" }}><LinkHolder><Notifications style={{ height: "20px", color: "gray" }} />Notifications</LinkHolder></Link>
            <Link to={"/message"} style={{ textDecoration: "none" }}><LinkHolder><Message style={{ height: "20px", color: "gray" }} />Messages</LinkHolder></Link>
          </MiddleDiv>

          <BottomDiv>
            <Heading>SOCIALS</Heading>
            <SocialHolder>
              <ImageLink href={currentUser?.instagram} target='_blank'><Instagram /></ImageLink>
              {showInputInsta && <><input name='instagram' type="text" defaultValue={currentUser?.instagram} onChange={handleChange} /><Send style={{ height: "16px", color: "gray" }} onClick={()=>handleUpdate("insta")} /></>}
              <Edit onClick={(e) => setShowInputInsta(!showInputInsta)} style={{ height: "16px", color: "gray" }} />
            </SocialHolder>
            <SocialHolder>
              <ImageLink href={currentUser?.facebook } target='_blank'><Facebook /></ImageLink>
              {showInputFb && <><input name='facebook' type="text" defaultValue={currentUser?.facebook} onChange={handleChange} /><Send style={{ height: "16px", color: "gray" }} onClick={()=>handleUpdate("fb")} /></>}
              <Edit onClick={(e) => setShowInputFb(!showInputFb)} style={{ height: "16px", color: "gray" }} />
            </SocialHolder>
            <SocialHolder>
              <ImageLink href={currentUser?.linkedIn} target='_blank'><LinkedIn /></ImageLink>
              {showInputLin && <><input name='linkedIn' type="text" defaultValue={currentUser?.linkedIn} onChange={handleChange} /><Send style={{ height: "16px", color: "gray" }} onClick={()=>handleUpdate("lIn")} /></>}
              <Edit onClick={(e) => setShowInputLin(!showInputLin)} style={{ height: "16px", color: "gray" }} />
            </SocialHolder>
          </BottomDiv>
        </Wrapper>
      </Container>
    </Fragment>
  )
}

export default LeftBar