import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Login } from "../redux/apiCalls"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { refreshState } from "../redux/UserSlice"


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
  width: 100%;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
const Leftdiv = styled.div`
flex: 1 ;
/* background-color: red; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border-right: 1px solid var(--border-blue);
`

const Heading = styled.h1`
&.left{
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);
}

&.right{
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);
  /* position: absolute;
  top: 57%; */
}
  `
const Subtitle = styled.p`
margin: 12px 0;
font-weight: 500;
font-size: 14px;
`
const Form = styled.form`
width: 60%;
display: flex;
flex-direction: column;
align-items: center;
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
    color:var(--secondary-blue);
    cursor: pointer;
    font-weight: 800;
    `

const Rightdiv = styled.div`
    flex:1 ;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: relative;
    `

const Logo = styled.img`
  width: 240px;
  mix-blend-mode: darken;

`

const LogIn = () => {

  const dispatch = useDispatch();

  const { currentUser, loading, error } = useSelector((state) => state.user)

  const [userCredentials, setUserCredentials] = useState({
    userName: "",
    password: ""
  })

  const handleChange = (e) => {
    setUserCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  useEffect(() => {
    dispatch(refreshState())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    currentUser && toast("Login Successful")
    currentUser && window.location.reload()
  }, [currentUser])

  const handleLogin = (e) => {
    e.preventDefault()
    Login(dispatch, userCredentials);
  }

  return (
    <Fragment>
      <Container>
        <HeroDiv>
          <Leftdiv>
            <Heading className="left">Login</Heading>
            <Subtitle>Welcome back you've been missed!🙂 </Subtitle>
            <Form onSubmit={handleLogin}>
              {error && <ErrorMsg>{(error === 401) && "Invalid username or password"}</ErrorMsg>}
              {error && <ErrorMsg>{(error === 500) && "Something went wrong"}</ErrorMsg>}
              <InputWrapper>
                <Label htmlFor="email" >Email<RequiredSpan>*</RequiredSpan></Label>
                <Input id="email" type="email" name="email" placeholder="johndoe@gmail.com" minLength={5} onChange={handleChange} required />
              </InputWrapper>
              <InputWrapper>
                <Label>Password<RequiredSpan>*</RequiredSpan></Label>
                <Input type="password" name="password" placeholder="password" minLength={5} onChange={handleChange} required />
              </InputWrapper>
              <ButtonWrapper>
                <Button type="submit" > {loading ? "Loading" : "Log In"}</Button>
              </ButtonWrapper>
            </Form>
            <SignUpMsg>Don't have an account? <Link to={"/signup"}><Span>SignUp</Span></Link></SignUpMsg>
          </Leftdiv>
          <Rightdiv>
            <Logo src="https://i.ibb.co/tX4fmGf/Whats-App-Image-2023-07-03-at-11-18-12.jpg"/>
            <Heading className="right">Connect</Heading>
          </Rightdiv>
        </HeroDiv>
        <ToastContainer />
      </Container>
    </Fragment>
  )
}

export default LogIn