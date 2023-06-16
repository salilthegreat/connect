import { Fragment } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"


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
        <Form>
        <InputWrapperFlex>
        <InputWrapper>
            <Label>Username</Label>
            <Input type="text" placeholder="john768"></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Email</Label>
            <Input type="email" placeholder="johndoe@gmail.com"></Input>
          </InputWrapper>
        </InputWrapperFlex>
          <InputWrapperFlex>
          <InputWrapper>
            <Label>First Name</Label>
            <Input type="text" placeholder="John"></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Last Name</Label>
            <Input type="text" placeholder="Doe"></Input>
          </InputWrapper>
          </InputWrapperFlex>
          <InputWrapperFlex>
          <InputWrapper>
            <Label>Password</Label>
            <Input type="password" placeholder="password"></Input>
          </InputWrapper>
          <InputWrapper>
            <Label>Confirm Password</Label>
            <Input type="password" placeholder="confirm password"></Input>
          </InputWrapper>
          </InputWrapperFlex> 
          <ButtonWrapper>
          <Button>Sign Up</Button>
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