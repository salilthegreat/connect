import React, { Fragment } from 'react'
import styled from "styled-components"
import Navbar from '../components/Navbar'
import LeftBar from '../components/LeftBar'
import Middle from '../components/MIddle'
import Rightbar from '../components/Rightbar'


const MainDiv = styled.div`
    display: flex;
`

const Feed = () => {
  return (
    <Fragment>
        <Navbar/>       
        <MainDiv>
            <LeftBar/>
            <Middle/>
            <Rightbar/>
  </MainDiv>
    </Fragment>
  )
}

export default Feed