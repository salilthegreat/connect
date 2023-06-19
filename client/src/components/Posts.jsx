import React, { Fragment } from 'react'
import CreatePost from './CreatePost'
import Post from './Post'

const Posts = () => {
    return (
        <Fragment>
            <CreatePost />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </Fragment>
    )
}

export default Posts