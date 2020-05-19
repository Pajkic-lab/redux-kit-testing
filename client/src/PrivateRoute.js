import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectRegister } from './features/registerSlice'

const PrivateRoute = ({component: Component, ...rest}) => {
    const{isAuthenticated} = useSelector(selectRegister)
    return(
        <Route {...rest} render={props => !isAuthenticated? (
            <Redirect to='/' /> 
        ) : (
            <Component {...props} />
        )} />
    )
}

export default PrivateRoute

