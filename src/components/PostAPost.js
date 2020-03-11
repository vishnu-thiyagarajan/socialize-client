import axios from 'axios'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MyButton from '../util/MyButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const styles = makeStyles({
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
})

const PostAPost = (props) => {
  const classes = styles()
  const [state, setState] = useState({
    open: false,
    body: '',
    errors: {}
  })
  const handleOpen = () => {
    setState({ ...state, open: true })
  }
  const handleClose = () => {
    setState({ open: false, errors: {} })
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/posts', { body: state.body })
      .then((res) => { props.setPosts(res.data) })
      .then(() => handleClose())
  }
  return (
    <>
      <MyButton onClick={handleOpen} tip='Post a Post!'>
        <AddIcon />
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
        <DialogTitle>What's in your mind?</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name='body'
              type='text'
              label='Post!!'
              multiline
              rows='3'
              placeholder='Post at others Timeline'
              error={!!state.errors.body}
              helperText={state.errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submitButton}
            >Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default PostAPost
