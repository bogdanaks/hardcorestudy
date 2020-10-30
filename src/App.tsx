import React from 'react'
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom'

import { Alert } from './components/Alert/Alert'
import { Main } from './components/Main/Main'
// import { Notifycation } from './components/Notifycation/Notifycation'
import { Auth } from './components/Auth/Auth'
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'

export const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" component={Main} exact />
                    <Route path="/auth" component={Auth} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
            <Alert />
        </div>
    )
}
