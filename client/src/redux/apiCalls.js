//LOGIN CALL

import { publicRequest } from "../requestMetohd"
import { apiCallError, apiCallStart, loginSuccess, signUpSuccess } from "./UserSlice"

export const Login =async (dispatch,userCredentials)=>{
    dispatch(apiCallStart())
    try {
        const res = await publicRequest.post("/auths/login",userCredentials);
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(apiCallError(error.response.status))
    }
}

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
