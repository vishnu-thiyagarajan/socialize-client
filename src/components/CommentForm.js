import React, { useState } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  button: {
    float: 'right'
  },
  textField: {
    margin: '10px auto 10px auto'
  }
})

const CommentForm = (props) => {
  const classes = styles()
  const [body, setBody] = useState('')
  const [errors, setErrors] = useState(null)
  const handleChange = (event) => setBody(event.target.value)
  const handleSubmit = (event) => {
    event.preventDefault()
    axios
      .post(`/posts/${props.postId}/comment`, { body: body })
      .then((res) => {
        props.likesComms(res.data.post)
        setBody('')
        setErrors(null)
      })
      .catch((err) => setErrors(err.response && err.response.data && err.response.data.comment))
  }
  const commentFormMarkup = (
    <Grid item sm={12} style={{ textAlign: 'center' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name='body'
          type='text'
          label='Comment on post'
          error={!!errors}
          helperText={errors}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}
        >
            Submit
        </Button>
      </form>
    </Grid>
  )
  return commentFormMarkup
}

export default CommentForm
