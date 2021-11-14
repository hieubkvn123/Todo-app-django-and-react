import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'
import { msg_success, msg_failed } from './msgAction'
import axios from 'axios'

export const login = (username, password) => dispatch => {
	const body = { username, password }
    const headers = {
        'headers' : {
            'Content-Type' : 'application/json'
        }
    }

    axios.post('/auth/login', body, headers)
        .then(res => {
            dispatch(msg_success(res.data.msg))
            dispatch({
                type : LOGIN_SUCCESS,
                payload : res.data.payload
            })

            window.location.replace('/user')
        })
        .catch(res => {
            dispatch(msg_failed(res.response.data.msg))
            dispatch({
                type : LOGIN_FAIL
            })
        })
}

export const register = (name, username, password) => dispatch => {
    const body = { name, username, password }
    const headers = {
        "headers" : {
            "Content-Type" : "application/json"
        }
    }
    axios.post("/auth/register", body, headers)
        .then(res => {
            dispatch(msg_success(res.data.msg))

            dispatch({
                type : REGISTER_SUCCESS,
                payload : res.data.payload
            })

            window.location.replace("/user")
        })
        .catch(res => {
            dispatch(msg_failed(res.response.data.msg))

            dispatch({
                type : REGISTER_FAIL
            })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type : LOGOUT_SUCCESS
    })
}