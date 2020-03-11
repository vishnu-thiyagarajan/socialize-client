import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import MyButton from '../util/MyButton'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

const styles = makeStyles({
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
})

const DeletePost = (props) => {
  const classes = styles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const deletePost = () => {
    axios
      .delete(`/posts/${props.postId}`)
      .then(() => { props.likesComms({ postId: props.postId }, true) })
      .catch((err) => console.log(err))
    setOpen(false)
  }
  return (
    <>
      <MyButton
        tip='Delete Post'
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color='secondary' />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>
          Are you sure you want to delete this scream ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
              Cancel
          </Button>
          <Button onClick={deletePost} color='secondary'>
              Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeletePost
