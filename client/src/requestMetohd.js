import axios  from "axios";
const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDk2YjYzZGM1NDQwOTYwZjIwMDViZmQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg4MzYzMzU2LCJleHAiOjE2ODg5NjgxNTZ9.7yaerdLgD5wyHcVWt1_rhuVDZm2bwMQddWnkSH5XiTg"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{authorization:`Bearer ${TOKEN}` }
})