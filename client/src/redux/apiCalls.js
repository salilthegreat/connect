//LOGIN CALL
import { publicRequest, userRequest } from "../requestMetohd"
import { apiCallError, apiCallStart, createPostSuccess, loginSuccess, signUpSuccess, updateUserSuccess } from "./UserSlice"

//LOGIN CALL
export const Login =async (dispatch,userCredentials)=>{
    dispatch(apiCallStart())
    try {
        const res = await publicRequest.post("/auths/login",userCredentials);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(apiCallError(error.response.status))
    }
}

//SIGNUP CALL
export const SignUp = async(dispatch,userCredentials)=>{
    dispatch(apiCallStart());
    try {
        const res = await publicRequest.post("/auths/register",userCredentials);
        dispatch(signUpSuccess(res.data))
        console.log(res.data)
    } catch (error) {
        dispatch(apiCallError(error.response.status))     
    }
}

//UPDATE USER
export const UpdateUser = async(dispatch,userId,updateData) =>{
    dispatch(apiCallStart());
    try {
        const res = await userRequest.put(`/users/update/${userId}`,updateData);
        console.log(res.data)
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(apiCallError(error.response.status))
    }
}



//UPDATE POST
export const UpdatePost = async(dispatch,postId,userId,description) => {
    try {
        const res = await userRequest.put(`/posts/updatepost/${postId}/${userId}`,description);
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

//CREATE A COMMENT
export const CreateComment = async(dispatch,postId,userId,comment) => {
    try {
        const res = await userRequest.post(`/comments/${postId}/${userId}`,comment);
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}

