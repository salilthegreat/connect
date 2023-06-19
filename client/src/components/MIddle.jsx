import React, { Fragment } from 'react'
import { styled } from 'styled-components'
import Posts from './Posts'

const Container = styled.div`
    flex: 3;
`
const Wrapper = styled.div`
    padding: 20px;
    
`

const Middle = () => {
  return (
    <Fragment>
        <Container>
            <Wrapper>
            <Posts/>
            </Wrapper>
        </Container>
    </Fragment>
  )
}

export default Middle