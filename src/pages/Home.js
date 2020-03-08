import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
const Home = (props) => {
  const [Posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('/posts')
      .then(res => setPosts(res.data))
  }, [])
  const recentPostsMarkUp = Posts.length ? Posts.map((post, id) => <Post key={id} post={post} />) : <p>Loading...</p>
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>{recentPostsMarkUp}</Grid>
      <Grid item sm={4} xs={12}><p>Profile</p></Grid>
    </Grid>
  )
}

export default Home
