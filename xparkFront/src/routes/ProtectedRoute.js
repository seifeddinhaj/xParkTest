import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAuthenticated } from '../service/AuthGuard'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {},
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
