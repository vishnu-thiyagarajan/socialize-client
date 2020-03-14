import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NavBar from './components/NavBar'
import Logout from './components/Logout'
import User from './pages/User'
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
const App = () => {
  axios.defaults.baseURL = 'https://asia-east2-socialsite-64b08.cloudfunctions.net/api'
  const [auth, setAuth] = useState(null)
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const token = localStorage.SocializeIdToken
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.exp * 1000 < Date.now()) {
        setAuth(false)
        setUser(null)
        localStorage.removeItem('SocializeIdToken')
        alert('Session timed out.Please login again')
      } else {
        setAuth(true)
        axios.defaults.headers.common.Authorization = token
        setPosts([])
        axios
          .get('/user')
          .then(res => setUser(res.data))
      }
    }
    return () => setAuth(false)
  }, [auth])
  const likesComms = (newPost, del) => {
    const index = posts.findIndex(post => post.postId === newPost.postId)
    if (del) return setPosts([...posts.slice(0, index), ...posts.slice(index + 1)])
    setPosts([...posts.slice(0, index), newPost, ...posts.slice(index + 1)])
  }
  const handlePosts = (newPost) => setPosts([newPost, ...posts])
  return (
    <MuiThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <div className='container'>
            <NavBar auth={auth} setPosts={handlePosts} />
            <Switch>
              <Route exact path='/users/:handle' component={User} />
              <Route exact path='/users/:handle/post/:postId' render={(props) => <User user={user} setUser={setUser} likesComms={likesComms} {...props} />} />
              <Route exact path='/'><Home user={user} setUser={setUser} posts={posts} setPosts={setPosts} likesComms={likesComms} /></Route>
              <Route exact path='/login'><Login auth={auth} setAuth={setAuth} /></Route>
              <Route exact path='/logout'><Logout setAuth={setAuth} auth={auth} setUser={setUser} /></Route>
              <Route exact path='/signup'><Signup setAuth={setAuth} auth={auth} /></Route>
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  )
}

export default App
