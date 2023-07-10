import { configureStore } from "@reduxjs/toolkit"; 
import UserReducer from "./UserSlice"
import PostReducer from "./PostSlice"

export const store = configureStore ({
    reducer:{
        user:UserReducer,
        post:PostReducer
    }
})