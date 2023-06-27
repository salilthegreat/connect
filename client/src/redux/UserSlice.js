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
        },
        refreshLogin: (state) => {
            state.signUpRes = null;
        }
    }
});

export const { apiCallStart, loginSuccess, apiCallError, signUpSuccess, logOut, refreshLogin } = UserSlice.actions;
export default UserSlice.reducer