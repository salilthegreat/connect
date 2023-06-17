import React, { Fragment } from 'react'

const LeftBar = () => {
  return (
    <Fragment>
        <MainDiv>
          <TopDiv>
            <User/>
            <UserDetails>
              <Username></Username>
              <Location></Location>
            </UserDetails>
            <UpdateProfile></UpdateProfile>
          </TopDiv>
        </MainDiv>
    </Fragment>
  )
}

export default LeftBar