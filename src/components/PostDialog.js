import React, { useState } from 'react'
import axios from 'axios'
import MyButton from '../util/MyButton'
import Comments from './CommentForm.js'
import CommentForm from './CommentForm'
import dayjs from 'dayjs'
import { Link, useHistory } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import UnfoldMore from '@material-ui/icons/UnfoldMore'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  expandButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
})
const PostDialog = (props) => {
  const history = useHistory()
  const classes = styles()
  const [data, setData] = useState({})
  const [state, setState] = useState({
    open: false,
    oldPath: '',
    newPath: ''
  })
  const handleOpen = () => {
    if (!props.user) return history.push('/login')
    let oldPath = window.location.pathname
    const { userHandle, postId } = props
    const newPath = `/users/${userHandle}/post/${postId}`
    if (oldPath === newPath) oldPath = `/users/${userHandle}`
    window.history.pushState(null, null, newPath)
    setState({ ...state, open: true, oldPath, newPath })
    axios
      .get(`/posts/${postId}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err))
  }
  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath)
    setState({ ...state, open: false })
  }
  const dialogMarkup = (
    <Grid container spacing={10}>
      <Grid item sm={5}>
        <img src={data.userImage} alt='Profile' className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color='primary'
          variant='h5'
          to={`/users/${data.userHandle}`}
        >
            @{data.userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body2' color='textSecondary'>
          {dayjs(data.createdAt).format('h:mm a, MMMM DD YYYY')}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant='body1'>{data.body}</Typography>
        <hr />
        <span>{data.likeCount} likes</span><br />
        <span>{data.commentCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={data.postId} user={props.user} setUser={props.setUser} likesComms={props.likesComms} />
      <Comments comments={data.comments} />
    </Grid>
  )
  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip='Expand post'
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color='primary' />
      </MyButton>
      <Dialog
        open={state.open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <MyButton
          tip='Close'
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostDialog
