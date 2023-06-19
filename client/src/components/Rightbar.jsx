import React, { Fragment } from 'react'
import { styled } from 'styled-components'

const Container = styled.div`
    flex: 1.5;
    height: calc(100vh - 50px);

`
const Wrapper = styled.div`
    padding: 20px;
`

const Rightbar = () => {
  return (
    <Fragment>
        <Container>
            <Wrapper>
            Rightbar
            </Wrapper>
            </Container>
    </Fragment>
  )
}

export default Rightbar