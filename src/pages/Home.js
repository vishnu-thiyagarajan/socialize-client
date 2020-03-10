import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
import Profile from '../components/Profile'
const Home = (props) => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const token = localStorage.SocializeIdToken
    if (token) props.setAuth(true)
    axios.defaults.headers.common['Authorization'] = token
    axios.get('/posts')
      .then(res => setPosts(res.data))
  }, [props])
  const recentPostsMarkUp = posts.length ? posts.map((post, id) => <Post key={id} post={post} />) : <p>Loading...</p>
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>{recentPostsMarkUp}</Grid>
      <Grid item sm={4} xs={12}>
        <Profile user={props.user} />
      </Grid>
    </Grid>
  )
}

export default Home
