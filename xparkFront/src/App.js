import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import ProtectedRoute from './routes/ProtectedRoute'
import 'react-toastify/dist/ReactToastify.css';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <ProtectedRoute component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App
