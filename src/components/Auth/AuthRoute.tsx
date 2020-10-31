import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface AuthRouteProps extends RouteProps {
    type?: 'private' | 'isAuth'
}

export const AuthRoute: React.FC<AuthRouteProps> = (props) => {
    const user = JSON.parse(localStorage.getItem('user')!)

    if (props.type === 'isAuth' && user) {
        return <Redirect to="/" />
    } else if (props.type === 'private' && !user) {
        return <Redirect to="/auth" />
    } else {
        return <Route {...props} />
    }
}
