import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'
import Logout from './components/Logout'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import jwtDecode from 'jwt-decode'
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  }
})
const App = (props) => {
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const token = localStorage.SocializeIdToken
    if (token) {
      const decodedToken = jwtDecode(token)
      setUser({ email: decodedToken.email, user: decodedToken.user_id })
      if (decodedToken.exp * 1000 < Date.now()) {
        setAuth(false)
        props.history.push('/login')
      } else {
        setAuth(true)
      }
    }
    return () => setAuth(false)
  }, [props, auth])
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <div className='container'>
            <NavBar auth={auth} />
            <Switch>
              <Route exact path='/'><Home setAuth={setAuth} user={user}/></Route>
              <Route exact path='/login'><Login auth={auth} /></Route>
              <Route exact path='/logout'><Logout setAuth={setAuth} auth={auth} /></Route>
              <Route exact path='/signup'><Signup setAuth={setAuth} auth={auth} /></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
