import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import MyButton from '../util/MyButton'
import ChatIcon from '@material-ui/icons/Chat'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import LikeButton from './LikeButton'
import PostDialog from './PostDialog'
import DeletePost from './DeletePost'
import relativeTime from 'dayjs/plugin/relativeTime'
const Link = require('react-router-dom').Link

const styles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
})
const Post = (props) => {
  dayjs.extend(relativeTime)
  const classes = styles()
  const { postId, body, userHandle, userImage, createdAt, likeCount, commentCount } = props.post
  return (
    <Card className={classes.card}>
      <CardMedia component={Link} to={`/users/${userHandle}/post/${postId}`} image={userImage} title='Profile image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typography>
        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant='body1'>{body}</Typography>
        {props.user && userHandle === props.user.credentials.handle ? (<DeletePost postId={postId} likesComms={props.likesComms} />) : null}
        <CardActions>
          <LikeButton postId={postId} user={props.user} setUser={props.setUser} likesComms={props.likesComms} />
          <span>{likeCount} Likes</span>
          <MyButton tip='comments'> <ChatIcon color='primary' /></MyButton>
          <span>{commentCount} comments</span>
          <PostDialog postId={postId} userHandle={userHandle} user={props.user} setUser={props.setUser} likesComms={props.likesComms} />
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default Post
