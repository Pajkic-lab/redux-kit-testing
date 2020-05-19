import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import PrivateRoute from './PrivateRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
      </BrowserRouter>
      
    </div>
  )
}

export default App
