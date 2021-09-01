import axios from 'axios'

// const API = axios.create({baseURL : 'https://blog-memory.herokuapp.com'})
const API = axios.create({baseURL : 'http://localhost:4000'});

API.interceptors.request.use((req) =>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})


export const fetchPosts = () => API.get('/api');
export const createPosts = (newPost) => API.post('/api', newPost)
export const updatePosts = (id, updatedPost) => API.patch(`/api/${id}`, updatedPost);
export const deletePosts = (id) => API.delete(`/api/${id}`);
export const likePost = (id) => API.patch(`/api/${id}/likePost`)

export const signIn = (formData) => API.post(`/user/signin`, formData);
export const signUp = (formData) => API.post(`/user/signup`, formData);