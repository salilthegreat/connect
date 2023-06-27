import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SignUp } from "../redux/apiCalls"


const Navbar = styled.nav`
height: 50px;
color: white;
background-color: black;
display: flex;
align-items: center;
font-weight: 700;
font-size: 30px;
`

const Maindiv = styled.div`
height: calc(100vh - 50px);
background-color: whitesmoke;
padding: 80px;
box-sizing: border-box;

`
const ContainerDiv = styled.div`
display: flex;
border: 4px solid white;
border-radius: 15px;
height: 100%;
position: relative;
`

const Leftdiv = styled.div`
flex: 0.8;
background-color: transparent;
z-index: 2;
`
const ImgHolder = styled.div`
 z-index: 5;
`

const TopImg = styled.img`
transform: scaleX(-1);
height: 80%;
position: absolute;
top: 88px;

`

const Rightdiv = styled.div`
flex:1.2;
background-color: white;
z-index: 2;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Heading = styled.h1`
  font-weight: 600;
  font-size: 50px;
`
const Subtitle = styled.p`
padding: 10px;
font-weight: 300;
font-size: 15px;
`
const Form = styled.form`
padding-top: 20px;
`
const InputWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 10px;
justify-content: space-between;
`
const InputWrapperFlex = styled.div`
display:flex;

`

const Label = styled.label`
margin-bottom: 5px;
font-weight: 500;
font-size: 10px;
`

const Input = styled.input`
border: 0.5px solid gray;
padding: 10px 20px;
width: 200px;
outline: none;
border-radius: 5px;
font-size: 11px;
font-weight: 300;
`
const ErrorMsgDiv = styled.div`
  color: red;
  text-align: center;
  font-weight: 400;
  font-size: 11px;
`

const ButtonWrapper = styled.div`
padding: 15px;
text-align: center;
`

const Button = styled.button`
padding: 10px 0px ;
border: none;
border-radius: 15px;
font-weight: 400;
background-color: lightgray;
width: 95%;
&:hover{
  background-color: lightgrey;
}
`
const SignUpMsg = styled.p`
    font-size: 13px;
    font-weight: 400;
`

const Span = styled.span`
    color: blue;
`

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, signUpRes } = useSelector((state) => state.user)

  const [userCredentials, setUserCredentials] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: ""
  })

  const handleChange = (e) => {
    setUserCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  // console.log(userCredentials)

  const handleSignUp = (e) => {
    e.preventDefault();
    SignUp(dispatch, userCredentials)
  }

  useEffect(() => {
    signUpRes && navigate("/") 
  },[signUpRes])

  return (
    <Fragment>
      <Navbar>
        Connect
      </Navbar>
      <Maindiv>
        <ImgHolder>
          <TopImg src="https://cdn.pixabay.com/photo/2014/04/09/17/48/man-320276_1280.png" alt="" />
        </ImgHolder>
        <ContainerDiv>
          <Leftdiv>
          </Leftdiv>
          <Rightdiv>
            <Heading>Hi there!</Heading>
            <Subtitle>Welcome to Connect. Meet with people around the world🙂 </Subtitle>
            <Form onSubmit={handleSignUp}>
                  {error && <ErrorMsgDiv> {(error === 401) && "Username already taken"}</ErrorMsgDiv>}
                  {error && <ErrorMsgDiv> {(error === 403) && "Email already taken"}</ErrorMsgDiv>}
              <InputWrapperFlex>
                <InputWrapper>
                  <Label>Username</Label>
                  <Input type="text" name="userName" placeholder="john768" onChange={handleChange} required minLength={5}></Input>
                </InputWrapper>
                <InputWrapper>
                  <Label>Email</Label>
                  <Input type="email" name="email" placeholder="johndoe@gmail.com" onChange={handleChange} required ></Input>
                </InputWrapper>
              </InputWrapperFlex>
              <InputWrapperFlex>
                <InputWrapper>
                  <Label>First Name</Label>
                  <Input type="text" name="firstName" placeholder="John" onChange={handleChange} required minLength={3}></Input>
                </InputWrapper>
                <InputWrapper>
                  <Label>Last Name</Label>
                  <Input type="text" name="lastName" placeholder="Doe" onChange={handleChange} required minLength={3}></Input>
                </InputWrapper>
              </InputWrapperFlex>
              <InputWrapperFlex>
                <InputWrapper>
                  <Label>Password</Label>
                  <Input type="password" name="password" placeholder="password" onChange={handleChange} required minLength={5}></Input>
                </InputWrapper>
                <InputWrapper>
                  <Label>Confirm Password</Label>
                  <Input type="password" placeholder="confirm password" required minLength={5}></Input>
                </InputWrapper>
              </InputWrapperFlex>
                  {error && <ErrorMsgDiv> {(error === 500) && "Something went wrong!"}</ErrorMsgDiv>}
              <ButtonWrapper>
                <Button type="submit"> {loading ? "Loading" : "Sign Up" }</Button>
              </ButtonWrapper>
            </Form>
            <SignUpMsg>Already have an account? <Span><Link to={"/"}>Login</Link></Span> </SignUpMsg>
          </Rightdiv>
        </ContainerDiv>
      </Maindiv>
    </Fragment>
  )
}

export default Signup