import { Fragment, useEffect, useState } from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { SignUp } from "../redux/apiCalls"
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
    position: absolute;
  top: 57%;
}

&.right{
  font-weight: 700;
  font-size: 48px;
  color: var(--primary-blue);

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
    color: var(--secondary-blue);
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

const Signup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, currentUser } = useSelector((state) => state.user)

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setUserCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSignUp = (e) => {
    e.preventDefault();
    SignUp(dispatch, userCredentials)
  }

  useEffect(() => {
    dispatch(refreshState())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    currentUser && toast("Sign Up Successful")
    currentUser && setTimeout(() => {
      navigate("/setup")
    }, 1500)
    // eslint-disable-next-line
  }, [currentUser])

  console.log(JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)?.signUpRes )

  return (
    <Fragment>
      <Container>
        <HeroDiv>
          <Leftdiv>
            <Logo src="https://i.ibb.co/tX4fmGf/Whats-App-Image-2023-07-03-at-11-18-12.jpg" />
            <Heading className="left">Connect</Heading>
          </Leftdiv>
          <Rightdiv>
            <Heading className="right">Signup</Heading>
            <Subtitle>Welcome to Connect. Meet with people around the world🙂 </Subtitle>
            <Form onSubmit={handleSignUp}>
              {error && <ErrorMsg> {(error === 401) && "Email already taken"}</ErrorMsg>}
              <InputWrapper>
                <Label>Email<RequiredSpan>*</RequiredSpan></Label>
                <Input type="email" name="email" placeholder="johndoe@gmail.com" onChange={handleChange} required ></Input>
              </InputWrapper>
              <InputWrapper>
                <Label>Password<RequiredSpan>*</RequiredSpan></Label>
                <Input type="password" name="password" placeholder="password" onChange={handleChange} required minLength={5}></Input>
              </InputWrapper>
              <InputWrapper>
                <Label>Confirm Password<RequiredSpan>*</RequiredSpan></Label>
                <Input type="password" placeholder="confirm password" required minLength={5}></Input>
              </InputWrapper>
              {error && <ErrorMsg> {(error === 500) && "Something went wrong!"}</ErrorMsg>}
              <ButtonWrapper>
                <Button type="submit"> {loading ? "Loading" : "Sign Up"}</Button>
              </ButtonWrapper>
            </Form>
            <SignUpMsg>Already have an account? <Link to={"/"}><Span>Login</Span></Link> </SignUpMsg>
          </Rightdiv>
          <ToastContainer />
        </HeroDiv>
      </Container>
    </Fragment>
  )
}

export default Signup