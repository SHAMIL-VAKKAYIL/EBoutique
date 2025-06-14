import axios from 'axios'
const Url = 'http://localhost:5000/'

export const apiUrl = axios.create({
    baseURL: Url,
    withCredentials: true
})