import React, { Fragment, useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { SearchOutlined } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { apiCallStart } from '../redux/UserSlice'
import { userRequest } from '../requestMetohd'
import { Follow } from "../redux/apiCalls"
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
    padding: 20px;
`
const Heading = styled.h1`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 20px;
`
const Search = styled.input`
  width: 90%;
  outline: none;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 5px 10px;
  font-weight: 300;
  font-size: 13px;
`

const SearchWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;

display: flex;
align-items: center;
`

const UserSection = styled.div`
display: flex;
flex-direction: column;
gap: 15px;
margin-bottom: 20px;
`
const UserProfile = styled.div`
display: flex;
column-gap: 40px;
align-items: center;
justify-content: space-between;
padding: 10px;
-webkit-box-shadow: 0px -1px 16px -3px #6b6a6a; 
    border-radius: 10px;
    box-shadow: 0px -1px 16px -3px #595858;

`
const ProfilePic = styled.img`
height: 40px;
width: 40px;
border-radius: 50%;
object-fit: cover;
cursor: pointer;
`
const Details = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const UserName = styled.span`
font-weight: 400;
font-size: 13px;
cursor: pointer;
`
const UserLocation = styled.span`
font-size: 10px;
font-weight: 200;
`

const FollowButton = styled.a`
  padding: 5px;
  border-radius: 5px;
  border: none;
  font-weight: 300;
  font-size: 10px;
  cursor: pointer;
`

const ShowMoreButton = styled.button`
  padding: 10px 5px;
  border-radius: 8px;
  border: 1px solid gray;
  outline: none;
  font-weight: 300;
  font-size: 11px;
  width: 90%;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  
`

const FeedRightbar = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [suggestion, setSuggestion] = useState([])
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  // const [following,setFollowing] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const Suggestions = async () => {
      dispatch(apiCallStart());
      try {

        const res = (query.length > 2) ? await userRequest.get(`/users/search?q=${query}`) : await userRequest.get(`/users/findsorted?page=${1}&limit=5`);
        console.log(res.data)
        setSuggestion(res.data)
      } catch (error) {
        console.log(error)
      }

    }
    Suggestions()
    // eslint-disable-next-line
  }, [query])

  const handleFollow = (userId) => {
    Follow(dispatch, userId)
  }

  const handleShowMore = async () => {

    dispatch(apiCallStart);
    try {
      const res = await userRequest.get(`/users/findsorted?page=${page + 1}&limit=5`)
      console.log(res.data, res.status)
      setSuggestion(res.data)
      setPage(page + 1)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Wrapper>
        <Heading>
          Suggestion for you
        </Heading>
        <SearchWrapper>
          <Search placeholder='Search for friends...' onChange={(e) => setQuery(e.target.value)} />
          <SearchOutlined style={{ height: '22px', color: "gray", position: "absolute", right: "10px", }} />
        </SearchWrapper>
        <UserSection>
          {suggestion.map((friend) => (
            <UserProfile key={friend._id}>
              <ProfilePic src={friend?.profilePicture ? friend.profilePicture : "http://localhost:5000/static/profilePic.png"} onClick={() => navigate(`/profile/${friend._id}`)} />
              <Details>
                <UserName onClick={() => navigate(`/profile/${friend._id}`)}>{friend.firstName}  {friend.lastName}</UserName>
                <UserLocation>{friend?.currentCity}{friend.currentCity && friend.country && <span>,</span>}<UserLocation>{friend.country}</UserLocation></UserLocation>
              </Details>
              <FollowButton onClick={() => handleFollow(friend._id)}>{currentUser?.followings.includes(friend._id) ? "Unfollow" : "Follow"}</FollowButton>
            </UserProfile>
          ))}
        </UserSection>
        <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
      </Wrapper>
    </Fragment>
  )
}

export default FeedRightbar