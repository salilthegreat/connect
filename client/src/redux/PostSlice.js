import {createSlice} from "@reduxjs/toolkit"

export const PostSlice = createSlice({
    name:"post",
    initialState:{
        posts:[],
        fetching:false,
        postError:null,
    },
    reducers:{
        postApiCallStart:(state)=>{
            state.fetching= true;
            state.postError = null;
        },
        postApiCallError:(state,action)=>{
            state.fetching= false;
            state.postError = action.payload
        },
        fetchingPostSuccess:(state,action)=>{
            state.fetching= false;
            state.postError = false;
            state.posts = action.payload
        },
        createPostSuccess:(state,action)=>{
            state.error = false;
            state.fetching = false;
            state.posts.unshift(action.payload)
        },
        deletePost:(state,action)=>{
            state.error = false;
            state.fetching = false;
            state.posts.splice(
                state.posts.findIndex((item) => item._id === action.payload),1
            )
        },
        postLiked:(state,action)=> {
            state.error = false;
            state.fetching = false;
            state.posts[state.posts.findIndex((item)=>item._id===action.payload.postId)].likes.push(action.payload.userId)
        },
        postDisliked:(state,action)=> {
            state.error = false;
            state.fetching = false;
            state.posts[state.posts.findIndex((item)=>item._id===action.payload.postId)].likes.pop( action.payload.userId)
        }
    }
})

export const {postApiCallStart,postApiCallError,fetchingPostSuccess,createPostSuccess,deletePost,postLiked,postDisliked} = PostSlice.actions;

export default PostSlice.reducer