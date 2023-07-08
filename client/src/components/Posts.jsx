import React, { Fragment, useEffect, useState } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'
import { apiCallError } from '../redux/UserSlice'
import { userRequest } from '../requestMetohd'

const Posts = () => {
    const [posts,setPosts] = useState([])
    const[fetching,setFetching] = useState(false)
    useEffect(() => {
        const FeedPost = async () => {
            setFetching(true)
            try {
                const res = await userRequest.get("/posts/getfeed");
                setPosts(res.data)
            } catch (error) {
                apiCallError(error.response.status)
            }
            setFetching(false)
        };
        FeedPost();
    }, []);
    return (
        <Fragment>
            <CreatePost />
            {fetching ? "Fetching" : posts?.map((item)=>(
            <Post item={item} key={item._id}/>
            ))}
        </Fragment>
    )
}

export default Posts