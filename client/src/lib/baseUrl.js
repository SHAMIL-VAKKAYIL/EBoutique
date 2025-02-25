import axios from 'axios'
const Url = 'http://localhost:3000/'

export const apiUrl = axios.create({
    baseURL: Url,
    withCredentials: true
})