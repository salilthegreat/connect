//FETCH ALL POSTS

import { userRequest } from "../requestMetohd";
import { createPostSuccess, deletePost, fetchingPostSuccess, postApiCallStart, postDisliked, postLiked, updatePost } from "./PostSlice"
import { apiCallStart } from "./UserSlice";


export const FeedPosts = async(dispatch) =>{
    dispatch(postApiCallStart());
    try {
        const res = await userRequest.get("/posts/getfeed");
        dispatch(fetchingPostSuccess(res.data.sort((p1,p2)=>{return new Date(p2.createdAt) - new Date(p1.createdAt)})))
    } catch (error) {
        console.log(error)
    }
}


//CREATE A POST
export const NewPost = async(dispatch,postData) =>{
    dispatch(postApiCallStart());
    try {
        const res = await userRequest.post("/posts/create",postData)
        dispatch(createPostSuccess(res.data))
    } catch (error) {
        console.log(error);
        // dispatch(apiCallError(error.response.status))
    }
}

//UPDATE POST
export const UpdatePost = async(dispatch,postId,userId,description) => {
    dispatch(apiCallStart())
    try {
        const res = await userRequest.put(`/posts/updatepost/${postId}/${userId}`,description);
        dispatch(updatePost({postId,updatedPost:res.data}))
    } catch (error) {
        console.log(error)
    }
}

//DELETE A POST
export const DeletePost = async(dispatch,postId,userId)=>{
    dispatch(postApiCallStart)
    try {
        const res = await userRequest.delete(`/posts/${postId}/${userId}`);
        dispatch(deletePost(postId))
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

//LIKE/UNLIKE A POST
export const LikePost = async(dispatch,postId,userId) =>{
    dispatch(postApiCallStart)
    try {
        const res = await userRequest.put(`/posts/like/${postId}`);
        if(res.data ==="liked"){
            dispatch(postLiked({postId:postId,userId:userId}))
        }else{
            dispatch(postDisliked({postId:postId,userId:userId}))
        }
    } catch (error) {
        console.log(error)
    }
}