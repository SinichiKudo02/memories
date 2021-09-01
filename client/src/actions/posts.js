import * as api from '../api'
import {CREATE, DELETE, UPDATE, FETCH_ALL} from '../constants/actionType'
/* Action Creators*/

const getPosts = () => async(dispatch) =>
{
    try {
        const {data} = await api.fetchPosts()
        dispatch({type : FETCH_ALL, payload : data})
    } catch (error) {
        console.log(error.message)
    }
}

export const createPost = (post) => async(dispatch) =>
{
    try {
        const {data} = await api.createPosts(post)
        dispatch({type : CREATE, payload : data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post) => async(dispatch) =>
{
    try {
        const {data} = await api.updatePosts(id, post);
        dispatch({type : UPDATE, payload : data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id) => async (dispatch) =>
{
    try {
        await api.deletePosts(id)
        dispatch({type : DELETE, payload : id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async(dispatch) =>
{
    try {
        const {data} = await api.likePost(id);
        dispatch({type : UPDATE, payload : data})
    } catch (error) {
        console.log(error)
    }
}



export default getPosts;
