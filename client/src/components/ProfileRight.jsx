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

const ButtonColor = styled.div`
    position: absolute;
    background-color: gray;
    opacity: 0.3;
    top: 0;
    left: 0px;
    height: 36px;
    width: 97px;
    border-radius: 18px;
    /* transform: translateX(${(props) => (props.slideindex + "px")}); */
    transform: translateX(${props => ((props.slideindex) + "px")});

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

const Users = styled.div`
display: flex;
flex-direction: column;
align-items: center;
cursor: pointer;
`
const UserPic = styled.img`
height: 80px;
width: 80px;
border-radius: 20px;
object-fit: cover;
`
const UserName = styled.span`
font-weight: 400;
font-size: 13px;
`

const ProfileRight = ({ user }) => {
    const [slideindex, setSlideindex] = useState(0)
    const [followers, setFollowers] = useState(true)
    const [followings, setFollowings] = useState(false)

    const handleSwitch = (direction) => {
        if (direction === "left") {
            setFollowers(true);
            setFollowings(false)
            setSlideindex(0)
        } else {
            setFollowings(true);
            setFollowers(false)
            setSlideindex(100)
        }
    }

    console.log(user)
    return (
        <Fragment>
            <Wrapper>
                <FollowButtons>
                    <FollowersButton onClick={() => handleSwitch("left")}>Followers</FollowersButton>
                    <FollowingsButton onClick={() => handleSwitch("right")}>Followings</FollowingsButton>
                    <ButtonColor slideindex={slideindex}></ButtonColor>
                </FollowButtons>
                <FollowWrapper>

                    {followers && <UserFollowers>
                        {user?.followers?.map((userId)=>
                        <User userId={userId}/>
                        )}
 
                    </UserFollowers>
                    }
                    {followings && <UserFollowings>
                        {user?.followings?.map((userId) =>
                            <User userId={userId}/>
                        )}
                    </UserFollowings>
                    }
                </FollowWrapper>
            </Wrapper>
        </Fragment >
    )
}

export default ProfileRight