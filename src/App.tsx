import React from 'react'
import { MemoryRouter as Router, Switch } from 'react-router-dom'

import { Alert } from './components/Alert/Alert'
import { Main } from './components/Main/Main'
// import { Notifycation } from './components/Notifycation/Notifycation'
import { Auth } from './components/Auth/Auth'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'

import { AuthRoute } from './components/Auth/AuthRoute'

export const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <AuthRoute type="private" path="/" component={Main} exact />
                    <AuthRoute type="isAuth" path="/auth" component={Auth} />
                    <AuthRoute type="isAuth" path="/login" component={Login} />
                    <AuthRoute type="isAuth" path="/register" component={Register} />
                </Switch>
            </Router>
            <Alert />
        </div>
    )
}
