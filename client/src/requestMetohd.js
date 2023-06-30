import axios  from "axios";
const BASE_URL = "http://localhost:5000/api"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDk2YjYzZGM1NDQwOTYwZjIwMDViZmQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg4MTAzMTY4LCJleHAiOjE2ODgxODk1Njh9.uYwfIX2bktl0VOL8_fVBpuNo04ZYfubDFcjtozBR-k0"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{authorization:`Bearer ${TOKEN}` }
})