import React, { useState, useRef, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Post from '../components/Post'
import Profile from '../components/Profile'

const Home = (props) => {
  const [lastID, setLastID] = useState(new Date().toISOString())
  const [hasMore, setHasMore] = useState(true)
  const { user, setUser, posts, setPosts } = props
  const observer = useRef()
  const lastPostElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      const limit = 5 // Number(process.env.REACT_APP_POST_LIMIT)
      if (entries[0].isIntersecting && hasMore) {
        try {
          axios.get(`/posts/${lastID}/${limit}`)
            .then(res => {
              if (!res.data.length) return setHasMore(false)
              setPosts([...posts, ...res.data])
              setLastID(res.data[res.data.length - 1].createdAt)
            })
        } catch (err) {
          console.log('Fetch Error :', err)
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [hasMore, posts, lastID, setPosts])
  const recentPostsMarkUp = posts.length ? posts.map((post, id) => <Post key={id} post={post} user={user} setUser={setUser} likesComms={props.likesComms} />) : <p>Loading...</p>
  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <Profile user={user} setUser={setUser} />
      </Grid>
      <Grid item sm={8} xs={12}>{recentPostsMarkUp}</Grid>
      <hr ref={lastPostElementRef} />
    </Grid>
  )
}

export default Home
