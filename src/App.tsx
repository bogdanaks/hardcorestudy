import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Alert } from './components/Alert/Alert'
import { AuthRoute } from './utils/AuthRoute'
import { Navbar } from './components/Navbar/Navbar'
import { PageHome } from './pages/PageHome/PageHome'
import { PageLogin } from './pages/Auth/PageLogin'
import { PageDecks } from './pages/PageDecks'
import { PageCards } from './pages/PageCards'
import { PageRegister } from './pages/Auth/PageRegister'

export const App = () => {
    return (
        <div className="App ">
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" component={PageHome} exact />
                    <AuthRoute type="private" path="/decks" component={PageDecks} exact />
                    <AuthRoute type="private" path="/decks/:deckId" component={PageCards} />
                    <AuthRoute type="isAuth" path="/login" component={PageLogin} />
                    <AuthRoute type="isAuth" path="/register" component={PageRegister} />
                </Switch>
            </Router>
            <Alert />
        </div>
    )
}
