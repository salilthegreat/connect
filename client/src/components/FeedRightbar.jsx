import React, { Fragment } from 'react'
import { styled } from 'styled-components'
import { SearchOutlined } from '@mui/icons-material'

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
`
const Details = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const UserName = styled.span`
font-weight: 400;
font-size: 13px;
`
const UserLocation = styled.span`
font-size: 10px;
font-weight: 200;
`
const FollowButton = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: none;
  font-weight: 300;
  font-size: 10px;
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
  
`

const FeedRightbar = () => {
    return (
        <Fragment>
            <Wrapper>
                <Heading>
                    Suggestion for you
                </Heading>
                <SearchWrapper>
                    <Search placeholder='Search for friends...' />
                    <SearchOutlined style={{ height: '22px', color: "gray", position: "absolute", right: "10px", }} />
                </SearchWrapper>
                <UserSection>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                    <UserProfile>
                        <ProfilePic src='https://images.unsplash.com/photo-1616769364512-1e50e8266907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=798&q=80' />
                        <Details>
                            <UserName>Abigail Colon</UserName>
                            <UserLocation>Manchestar,Portugal</UserLocation>
                        </Details>
                        <FollowButton>Follow</FollowButton>
                    </UserProfile>
                </UserSection>
                <ShowMoreButton>Show More</ShowMoreButton>
            </Wrapper>
        </Fragment>
    )
}

export default FeedRightbar