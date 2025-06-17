import axios from 'axios'
const Url = 'http://216.10.242.120:5000/'

export const apiUrl = axios.create({
    baseURL: Url,
    withCredentials: true
})
