import axios from "axios"

export const axiosBaseUrl = axios.create({
    baseURL:"http://localhost:5001",
    withCredentials:true
})

