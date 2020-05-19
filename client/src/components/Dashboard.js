import React, {useEffect, useState, Fragment} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, selectRegister, logout } from '../features/registerSlice'
import { imgup, selectPhoto, loadImages, removeImg, destroyCash } from '../features/photoSlice'

const Dashboard = () => {

    const[formData, setFormData] = useState({
        image: ''
    })

    const { image } = formData

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(loadUser())
        dispatch(loadImages())
        //eslint-disable-next-line
    },[])

    const{user} = useSelector(selectRegister)

    const {photos} = useSelector(selectPhoto)
    console.log(photos)

    const onSubmit = e => {
        e.preventDefault()
        dispatch(imgup({image}))
        setFormData({image: ''})
    }

    const lgt = () => {
        dispatch(logout())
        dispatch(destroyCash())
    }


    return (
        <div>
            <h1>{user && user.name}</h1>
            <button onClick={lgt}>LogOut</button> <br/><br/>

            <form onSubmit={onSubmit}>
                <input onChange={(e)=>{setFormData({image: e.target.value})}}
                 placeholder='insert-image-link' name='image' value={image} required /> <br/>
                 <button>SUBMIT</button>
            </form>
            { image!==''? (<img alt='' src={image} style={{width: '100', height:'100'}}></img>): ('')} <br/> <br/> <hr/>

            {photos && photos.map(el=> <Fragment key={el.id}>
                <img  src={el.photo} alt='' style={{width: '300px', height:'400px'}}></img> 
                <button onClick={()=>dispatch(removeImg(el.id))}>delete</button>
                 </Fragment>)}
        </div>
    )
}

export default Dashboard
