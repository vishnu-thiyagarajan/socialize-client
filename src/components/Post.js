import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
const Link = require('react-router-dom').Link

const styles = makeStyles({
  card: {
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
      <CardMedia image={userImage} title='Profile image' className={classes.image} />
      <CardContent className={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typography>
        <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant='body1'>{body}</Typography>
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(Post)
