import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

export const photoSlice = createSlice({
    name: 'photo',
    initialState: {
        photos: []
    },
    reducers: {
        getPhoto: (state, action) => {
            return{...state, photos: state.photos.concat(action.payload) }
        },

        getPhotos: (state, action) => {
            return{ ...state, photos: state.photos.concat(...action.payload)}
        },

        removeCash: (state, action)=> {
            return{ ...state, photos: []}
        },

        deleteImg: (state, action)=> {
            return{ ...state, photos: state.photos.filter(photo=> photo.id !== action.payload)}
        }
    }
})


export const imgup = (data) => async dispatch => {
    try {
        const res =await axios.post('/photos', data)
        console.log(res.data)
        dispatch(getPhoto(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const loadImages = () => async dispatch => {
    try {
        const res = await axios.get('/photos')
        dispatch(getPhotos(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const removeImg = id => async dispatch => {
    try {
        const res = await axios.delete('/photos', {data: {id}})
        console.log(res.data)
        dispatch(deleteImg(res.data))
    } catch (err) {
        console.log(err)
    }
}

export const destroyCash = () => dispatch => {
    try {
        dispatch(removeCash())
    } catch (err) {
        console.log(err)
    }
}



export const { getPhoto, getPhotos, removeCash, deleteImg } = photoSlice.actions

export const selectPhoto = state => state.photo

export default photoSlice.reducer