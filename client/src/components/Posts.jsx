import React, { Fragment, useEffect, } from 'react'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { FeedPosts, ProfilePosts } from '../redux/postApiCalls'
import Post from "./Post"
import { useParams } from 'react-router-dom'
import { userRequest } from '../requestMetohd'

const Posts = ({profile}) => {
    // const [posts,setPosts] = useState([])
    const params = useParams() 
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.post.posts)


    useEffect(() => {
       profile ? ProfilePosts(dispatch,params?.userId) : FeedPosts(dispatch,params?.userId)
    }, [params]);
    return (
        <Fragment>
            <CreatePost />
            { posts?.map((item)=>(
            <Post item={item} key={item?._id}/>
            ))}
        </Fragment>
    )
}

export default Posts