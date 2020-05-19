import { configureStore } from '@reduxjs/toolkit'
import registerReducer from '../features/registerSlice'
import photoReducer from '../features/photoSlice'

export default configureStore({
    reducer: {
        register: registerReducer,
        photo: photoReducer
    }
})