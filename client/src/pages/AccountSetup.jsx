import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SignUp, UpdateUser } from "../redux/apiCalls"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiCallError, apiCallStart, refreshState, updateUserSuccess } from "../redux/UserSlice"
import { AddAPhoto } from "@mui/icons-material"
import { userRequest } from "../requestMetohd"




const Container = styled.div`
display: flex;
height: 100vh;
padding: 5rem 9.75rem;
justify-content: center;
align-items: center;
background: #FFF;
box-sizing: border-box;
`

const HeroDiv = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const Middle = styled.div`
flex: 1 ;
/* background-color: red; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Heading = styled.h1`
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);
  margin-top: 10px;
  margin-bottom: 20px;
    /* position: absolute; */
  /* top: 57%; */
  `
  const SubHeading = styled.div`
      font-weight: 700;
  font-size: 24px;
  color: var(--primary-blue);
  `

const ImageWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`

const ProfilePic = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
`
const ProfileCircle = styled.div`
        width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid var(--border-blue);
    display: flex;
    justify-content: center;
    align-items: center;
`

const SetUpWrapper = styled.div`
    width: 100%;
`

const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
box-sizing: border-box;
`

const InputWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: column;
margin-bottom: 10px;
justify-content: space-between;
`


const Label = styled.label`
margin-bottom: 8px;
font-weight: 700;
font-size: 14px;

/* label.required:after{content:"*"} */
`
const RequiredSpan = styled.span`
  color: red;
  `

const Input = styled.input`
border: 0.5px solid gray;
padding: 10px 20px;
width: 200px;
outline: none;
border-radius: 5px;
font-size: 14px;
font-weight: 400;
align-self: stretch;
width: 100%;
box-sizing: border-box;
`
const ErrorMsg = styled.div`
  color: red;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
  `

const ButtonWrapper = styled.div`
margin: 15px 0px;
text-align: center;
width: 100%;
`

const Button = styled.button`
/* width: 100%; */
padding: 10px 0px ;
border: none;
border-radius: 10px;
font-weight: 400;
font-size: 14px;
background-color: var(--secondary-blue);
color: #FFFFFF;
width: 100%;
cursor: pointer;
&:hover{
  background-color: var(--tertiary-blue);
}
&:active{
  transform: scale(0.9);
}
`

const SignUpMsg = styled.p`
    margin-top: 5px;
    font-size: 14px;
    font-weight: 400;
    `
const Span = styled.span`
    color: var(--secondary-blue);
    cursor: pointer;
    font-weight: 800;
    `

const Logo = styled.img`
  width: 100px;
  mix-blend-mode: darken;

`

const AccountSetup = () => {
    const {currentUser} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, signUpRes } = useSelector((state) => state.user)
    const [profilePicture,setProfilePicture] = useState(null)
  
    const [userCredentials, setUserCredentials] = useState({
      userName: "",
      firstName:"",
      lastName:""
    })
  
    const handleChange = (e) => {
      setUserCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
  
  
    const handleUpdate =async (e) => {
      e.preventDefault();
      if(profilePicture){
        const data = new FormData();
        const fileName = new Date().getTime() + profilePicture.name;
        data.append("file",profilePicture);
        data.append("name",fileName);
        try {
          const res = await userRequest.post("/upload",data);
          UpdateUser(dispatch,currentUser._id,{profilePicture:res.data.file})
        } catch (error) {
          console.log(error)
        }
      }
      dispatch(apiCallStart());
      try {
          const res = await userRequest.put(`/users/update/${currentUser?._id}`,userCredentials);
          console.log(res.data)
          dispatch(updateUserSuccess(res.data));
          res && navigate(`/profile/${currentUser?._id}`)
      } catch (error) {
          console.log(error)
          dispatch(apiCallError(error.response.status))
      }
    }

    return (
      <Fragment>
        <Container>
          <HeroDiv>
            <Middle>
              <Logo src="https://i.ibb.co/tX4fmGf/Whats-App-Image-2023-07-03-at-11-18-12.jpg" />
              <SubHeading className="right">Connect</SubHeading>
              <Heading className="right">Account Setup</Heading>
              <SetUpWrapper>
                <ImageWrapper>
                    <ProfileCircle>
                    {currentUser?.profilePicture ? 
                  <ProfilePic src={currentUser.profilePicture}/>  :
                    <ProfilePic src={profilePicture ? URL.createObjectURL(profilePicture) :"http://localhost:5000/static/profilePic.png" }/>
                  }
                    <Label htmlFor="profilePic">
                    <AddAPhoto style={{position:"absolute",bottom:"5%", right:"35%"}}/>
                    </Label>
                    </ProfileCircle>
                </ImageWrapper>
                <Input type="file" id="profilePic" onChange={(e)=>setProfilePicture(e.target.files[0])} style={{display:"none"}}/>
              <Form onSubmit={handleUpdate}>
                {error && <ErrorMsg> {(error === 401) && "Username already taken"}</ErrorMsg>}
                <InputWrapper>
                  <Label>Username<RequiredSpan>*</RequiredSpan></Label>
                  <Input type="text" name="userName" placeholder="john768" onChange={handleChange} required minLength={5}></Input>
                </InputWrapper>
                <InputWrapper>
                  <Label>First Name<RequiredSpan>*</RequiredSpan></Label>
                  <Input type="text" name="firstName" placeholder="John" onChange={handleChange} required minLength={3} ></Input>
                </InputWrapper>
                <InputWrapper>
                  <Label>LastName<RequiredSpan>*</RequiredSpan></Label>
                  <Input type="text" name="lastName" placeholder="Doe" onChange={handleChange} required minLength={2}></Input>
                </InputWrapper>
                {error && <ErrorMsg> {(error === 500) && "Something went wrong!"}</ErrorMsg>}
                <ButtonWrapper>
                  <Button type="submit"> {loading ? "Loading" : "Complete Setup"}</Button>
                </ButtonWrapper>
              </Form>
              </SetUpWrapper>
              </Middle>
            <ToastContainer />
          </HeroDiv>
        </Container>
      </Fragment>
    )
}

export default AccountSetup