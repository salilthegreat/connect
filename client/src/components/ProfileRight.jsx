import React, { Fragment, useState } from 'react'
import { styled } from 'styled-components'
import User from './User'

const Wrapper = styled.div`
    padding: 20px;
`
const FollowButtons = styled.div`
position: relative;
margin-bottom: 20px;
`

// const ButtonColor = styled.div`
//     position: absolute;
//     background-color: gray;
//     opacity: 0.3;
//     top: 0;
//     left: 0px;
//     height: 38px;
//     width: 100px;
//     border-radius: 18px;
//     /* transform: translateX(${(props) => (props.slideindex + "px")}); */
//     transform: translateX(${props => ((props.slideindex) + "px")});
// `

const ButtonColor = styled.div`
&.left{
    position: absolute;
    background-color: gray;
    opacity: 0.3;
    top: 0;
    left: 0px;
    height: 38px;
    width: 100px;
    border-radius: 18px;
}

&.right{
    position: absolute;
    background-color: gray;
    opacity: 0.3;
    top: 0;
    left: 0px;
    height: 38px;
    width: 108px;
    border-radius: 18px; 
    transform: translateX(100px);
}
`

const FollowersButton = styled.button`
border: none;
padding: 10px 20px;
border-radius: 18px ;
font-size: 13px;
font-weight: 400;
cursor: pointer;

`
const FollowingsButton = styled.button`
border: none;
padding: 10px 20px;
border-radius: 18px ;
font-size: 13px;
font-weight: 400;
cursor: pointer;

`
const FollowWrapper = styled.div`
display: flex;
`

const UserFollowers = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
gap: 20px;
`
const UserFollowings = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
gap: 20px;
`

const ProfileRight = ({ user }) => {
    const [followers, setFollowers] = useState(true)
    const [followings, setFollowings] = useState(false)
    const [cls,setCls] = useState("left")

    const handleSwitch = (direction) => {
        if (direction === "left") {
            setFollowers(true);
            setFollowings(false)
            setCls("left")
        } else {
            setFollowings(true);
            setFollowers(false)
            setCls("right")
        }
    }

    // console.log(user)
    return (
        <Fragment>
            <Wrapper>
                <FollowButtons>
                    {/* <FollowersButton onClick={() => handleSwitch("left")}>Followers</FollowersButton>
                    <FollowingsButton onClick={() => handleSwitch("right")}>Followings</FollowingsButton>
                    <ButtonColor slideindex={slideindex} width={width}></ButtonColor> */}
                    <FollowersButton onClick={() => handleSwitch("left")}>Followers</FollowersButton>
                    <FollowingsButton onClick={() =>handleSwitch("right") }>Followings</FollowingsButton>
                    <ButtonColor className={cls}></ButtonColor>
                </FollowButtons>
                <FollowWrapper>

                    {followers && <UserFollowers>
                        {user?.followers?.map((userId) =>
                            <User userId={userId} key={userId} />
                        )}

                    </UserFollowers>
                    }
                    {followings && <UserFollowings>
                        {user?.followings?.map((userId) =>
                            <User userId={userId} key={userId} />
                        )}
                    </UserFollowings>
                    }
                </FollowWrapper>
            </Wrapper>
        </Fragment >
    )
}

export default ProfileRight