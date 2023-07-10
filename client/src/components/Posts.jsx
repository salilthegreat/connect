import React, { Fragment, useEffect, } from 'react'
import CreatePost from './CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { FeedPosts } from '../redux/postApiCalls'
import Post from "./Post"

const Posts = () => {
    // const [posts,setPosts] = useState([])
    const dispatch = useDispatch();
    const posts = useSelector((state)=>state.post.posts)
    useEffect(() => {
        FeedPosts(dispatch)
    }, [dispatch]);
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