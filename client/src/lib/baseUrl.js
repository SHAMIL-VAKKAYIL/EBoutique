import axios from 'axios'
const Url = 'http://www.shamileboutique.com:5000/'

export const apiUrl = axios.create({
    baseURL: Url,
    withCredentials: true
})
