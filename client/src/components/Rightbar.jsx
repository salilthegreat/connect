import React, { Fragment } from 'react'
import { styled } from 'styled-components'
import FeedRightbar from './FeedRightbar'
import ProfileRight from './ProfileRight'

const Container = styled.div`
    flex: 1.5;
    height: calc(100vh - 50px);

`


const Rightbar = ({ profile }) => {
  return (
    <Fragment>
      {profile ? <Container>
        <ProfileRight />
      </Container> :
        <Container>
          <FeedRightbar />
        </Container>
      }
    </Fragment>
  )
}

export default Rightbar