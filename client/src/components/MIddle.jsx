import React, { Fragment } from 'react'
import { styled } from 'styled-components'
import Posts from './Posts'

const Container = styled.div`
    flex: 3;
`
const Wrapper = styled.div`
    padding: 20px;
    
`

const Middle = ({profile}) => {
  return (
    <Fragment>
        <Container>
            <Wrapper>
            <Posts profile={profile}/>
            </Wrapper>
        </Container>
    </Fragment>
  )
}

export default Middle