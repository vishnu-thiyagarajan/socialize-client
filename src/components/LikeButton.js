import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MyButton from '../util/MyButton'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

const LikeButton = (props) => {
  const [liked, setLiked] = useState(null)
  useEffect(() => {
    if (props.user && !liked) setLiked(props.user.likes)
  }, [props, liked])
  const likedPost = () => {
    if (!liked) return
    return liked.find((item) => item.postId === props.postId)
  }
  const likePost = () => {
    setLiked([...liked, { postId: props.postId, userHandle: props.user.credentials.handle }])
    axios
      .get(`/posts/${props.postId}/like`)
      .then((res) => {
        props.likesComms(res.data)
      })
      .catch((err) => console.log(err))
  }
  const unlikePost = () => {
    setLiked(liked.filter(post => post.postId !== props.postId))
    axios
      .get(`/posts/${props.postId}/unlike`)
      .then((res) => {
        props.likesComms(res.data)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      {!props.user ? (
        <Link to='/login'>
          <MyButton tip='Like'>
            <FavoriteBorder color='primary' />
          </MyButton>
        </Link>) : likedPost() ? (
        <MyButton tip='Undo like' onClick={unlikePost}>
          <FavoriteIcon color='primary' />
        </MyButton>) : (
        <MyButton tip='Like' onClick={likePost}>
          <FavoriteBorder color='primary' />
        </MyButton>
      )}
    </div>
  )
}

export default LikeButton
