import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
import Profile from '../components/Profile'
const Home = (props) => {
  const { setAuth, user, setUser, posts, setPosts } = props
  useEffect(() => {
    const token = localStorage.SocializeIdToken
    if (token) setAuth(true)
    axios.defaults.headers.common.Authorization = token
    axios.get('/posts')
      .then(res => setPosts(res.data))
  }, [setAuth, setPosts])
  const recentPostsMarkUp = posts.length ? posts.map((post, id) => <Post key={id} post={post} user={user} setUser={setUser} likesComms={props.likesComms} />) : <p>Loading...</p>
  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <Profile user={user} setUser={setUser} />
      </Grid>
      <Grid item sm={8} xs={12}>{recentPostsMarkUp}</Grid>
      <hr />
    </Grid>
  )
}

export default Home
