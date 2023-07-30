import React, { Fragment, useEffect, useState, } from 'react'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { FeedPosts, ProfilePosts } from '../redux/postApiCalls'
import Post from "./Post"
import { useParams } from 'react-router-dom'

const Posts = ({ profile }) => {
    // const [posts,setPosts] = useState([])
    const params = useParams()
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.post)
    const { currentUser } = useSelector((state) => state.user)
    const [myProfile, setMyProfile]   = useState(false)

    useEffect(() => {
        if(params?.userId === currentUser?._id){
            setMyProfile(true)
        }else{
            setMyProfile(false)
        }
        // eslint-disable-next-line
    }, [params])

    useEffect(() => {
        profile ? ProfilePosts(dispatch, params?.userId) : FeedPosts(dispatch, params?.userId)
        // eslint-disable-next-line
    }, [params,dispatch]);
    return (
        <Fragment>
            {(myProfile || !profile) && <CreatePost/>}
            {posts?.map((item) => (
                <Post item={item} key={item?._id} />
            ))}
        </Fragment>
    )
}

export default Posts