import { createSlice } from "@reduxjs/toolkit"
export const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        loading: false,
        error: null,
        signUpRes: null
    },
    reducers: {
        apiCallStart: (state) => {
            state.loading = true;
            state.error = null
        },
        apiCallError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;
        },
        signUpSuccess: (state, action) => {
            state.error = null;
            state.loading = false;
            state.signUpRes = action.payload
        },
        logOut: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        refreshState: (state) => {
            state.signUpRes = null;
            state.error = null;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser= action.payload;
            state.loading = false;
            state.error = false;
        },
        followedUser:(state,action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser.followings.push(action.payload)
        },
        unfollowedUser:(state,action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser.followings.splice(state.currentUser.followings.findIndex((item)=>item === action.payload),1)
        }
    }
});

export const { apiCallStart, loginSuccess, apiCallError, signUpSuccess, logOut, refreshState,updateUserSuccess,followedUser,unfollowedUser } = UserSlice.actions;
export default UserSlice.reducer