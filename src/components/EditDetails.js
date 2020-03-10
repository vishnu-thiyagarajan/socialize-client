import axios from 'axios'
import React, { useState } from 'react'
import MyButton from '../util/MyButton'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'

const styles = makeStyles({
  button: {
    float: 'right'
  },
  textField: {
    margin: '10px auto 10px auto'
  }
})

const EditDetails = (props) => {
  const classes = styles()
  const [state, setState] = useState({
    bio: '',
    website: '',
    location: '',
    open: false
  })
  const handleOpen = () => {
    setState({ ...state, open: true })
  }
  const handleClose = () => {
    setState({ ...state, open: false })
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location
    }
    axios.post('/user', userDetails)
      .then(() => { props.setProfile(userDetails) })
      .then(() => handleClose())
  }
  return (
    <>
      <MyButton
        tip='Edit Details'
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color='primary' />
      </MyButton>
      <Dialog
        open={state.open}
        onClose={handleClose}
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name='bio'
              tpye='text'
              label='Bio'
              multiline
              rows='3'
              placeholder='A short bio about yourself'
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='website'
              tpye='text'
              label='Website'
              placeholder='Your personal/professinal website'
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name='location'
              tpye='text'
              label='Location'
              placeholder='Where you live'
              className={classes.textField}
              value={state.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>Cancel</Button>
          <Button onClick={handleSubmit} color='primary'>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditDetails
