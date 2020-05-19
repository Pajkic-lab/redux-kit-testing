import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import setTokenAuth from '../setAxios/setTokenAuth'


export const registerSlice = createSlice({
    name: 'register',
    initialState: {
        token: localStorage.getItem('token'),
        user: null,
        isAuthenticated: false
    },
    reducers: {
        register: (state, action) => {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, isAuthenticated: true, token: localStorage.getItem('token')
            }
        },

        login: (state, action)=> {
            localStorage.setItem('token', action.payload.token)
            return {
                ...state, isAuthenticated: true, token: localStorage.getItem('token')
            }
        },

        authenticate: (state, action)=> {
            const{id, email, name} = action.payload
            return { ...state, isAuthenticated: true, user: {id, email, name} }
        },

        lgt: (state, action) => {
            localStorage.removeItem('token')
            return { user: null, isAuthenticated: false, token: null }
        }
    }
})



export const reg = (data) => async dispatch => {
    try {
        const res = await axios.post('/users', data)
        dispatch(register(res.data))
        const { history } = data 
        history.push('/dashboard')
    } catch (err) {
        console.log(err)
    }
}

export const log = (data) => async dispatch => {
    try {
        const res = await axios.post('/auth', data)
        dispatch(login(res.data))
        const { history } = data 
        history.push('/dashboard')
    } catch (err) {
        console.log(err)
    }
}

export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setTokenAuth(localStorage.token)
    }
    try {
        const res = await axios.get('/auth')
        dispatch(authenticate(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const logout = ()=> dispatch => {
    try {
        dispatch(lgt())
    } catch (err) {
        console.log(err)
    }
}


export const { register, login, authenticate, lgt } = registerSlice.actions

export const selectRegister = state => state.register

export default registerSlice.reducer