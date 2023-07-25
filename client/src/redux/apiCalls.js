//LOGIN CALL
import { publicRequest, userRequest } from "../requestMetohd"
import { apiCallError, apiCallStart, followedUser, loginSuccess, signUpSuccess, unfollowedUser, updateUserSuccess } from "./UserSlice"

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
    } catch (error) {
        dispatch(apiCallError(error.response.status))     
    }
}

//UPDATE USER
export const UpdateUser = async(dispatch,userId,updateData) =>{
    dispatch(apiCallStart());
    try {
        const res = await userRequest.put(`/users/update/${userId}`,updateData);
        dispatch(updateUserSuccess(res.data));
    } catch (error) {
        console.log(error)
        dispatch(apiCallError(error.response.status))
    }
}


//FOLLOW UNFOLLOW USER

export const Follow = async (dispatch,userId) =>{
    dispatch(apiCallStart());
    try {
        const res = await userRequest.put(`/users/follow/${userId}`);
        console.log(res.data)
        if(res.data === "Followed"){
            dispatch(followedUser(userId))
        }else{
            dispatch(unfollowedUser(userId))
        }
    } catch (error) {
        console.log(error)
    }
}


