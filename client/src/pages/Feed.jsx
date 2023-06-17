import React, { Fragment } from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'


const MainDiv = styled.div`
    height: 100vh;
    background-color: whitesmoke;
    padding: 20px 40px ;
    box-sizing: border-box;
`
const Container = styled.div`
    display: flex;
    height: 100%;

`
const Holder = styled.div`
    padding:0px 20px;
`
const LeftContainer = styled.div`
    flex: 1;
    background-color: pink;
`
const MiddleContainer = styled.div`
    flex: 2.5;
`
const RightContainer = styled.div`
    flex: 1.5;
    background-color: lightcoral;
`

const Feed = () => {
  return (
    <Fragment>
        <Navbar/>
        <MainDiv>
            <Container>
                <LeftContainer></LeftContainer>
                <MiddleContainer>
                    <Holder>
                    <CreatePost/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    </Holder>
                </MiddleContainer>
                <RightContainer></RightContainer>
            </Container>
        </MainDiv>
    </Fragment>
  )
}

export default Feed