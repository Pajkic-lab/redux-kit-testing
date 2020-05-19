import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { reg, log } from '../features/registerSlice'

const LandingPage = ({history}) => {
    const [formData, setFormData] = useState({
        switcher: true,
        name: '',
        email: '',
        password: ''
    })

    const{switcher, name, email, password} = formData

    const dispatch = useDispatch()

    const swop = () => {setFormData({...formData, switcher: !switcher })}

    const onChange = e => {setFormData({
        ...formData, 
        [e.target.name]: e.target.value
    })}

    const onSubmit = e => {
        e.preventDefault()
        if(switcher === true ) {
            dispatch(log({email, password, history}))
        } else {
            dispatch(reg({name, email, password, history}))
        }
        setFormData({ ...formData, name:'', email:'', password:''})
    }

    return (
        <div>
            { switcher===true? (
            <Fragment>
            <h1>LOGIN</h1> <br/> <br/>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='email' name='email' value={email} required /><br/>
                <input onChange={onChange} placeholder='password' name='password' value={password} required /><br/> <br/>
                <button>LOGIN</button>
            </form>
            </Fragment>) :

            (
            <Fragment>
            <h1>REGISTER</h1> <br/> <br/>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} placeholder='name' name='name' value={name} required /><br/>
                <input onChange={onChange} placeholder='email' name='email' value={email} required /><br/>
                <input onChange={onChange} placeholder='password' name='password' value={password} required /><br/> <br/>
                <button>REGISTER</button>
            </form>
            </Fragment>)}

            <br/><br/>
            {switcher===true? 'Need new account?' : 'Alredy have account?'}<br/>
            <button onClick={swop}>{switcher===true? 'REGISTER':'LOGIN'}</button>
        </div>
    )
}

export default LandingPage
