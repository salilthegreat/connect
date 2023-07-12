//LOGIN CALL
import { publicRequest, userRequest } from "../requestMetohd"
import { apiCallError, apiCallStart, loginSuccess, signUpSuccess, updateUserSuccess } from "./UserSlice"

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



