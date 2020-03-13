import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppIcon from '../images/favi.png'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = makeStyles({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20
  },
  customError: {
    color: 'Red',
    fontSize: '0.8rem',
    marginTop: 20
  }
})

const Login = (props) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', loading: false, errors: {} })
  const classes = styles()
  useEffect(() => {
    return () => {
      if (loggedIn) {
        props.setAuth(true)
      }
    }
  }, [loggedIn, props])
  const handleSubmit = (event) => {
    event.preventDefault()
    setForm({ ...form, loading: true })
    const UserData = {
      email: form.email,
      password: form.password
    }
    axios.post('/login', UserData)
      .then(res => {
        localStorage.setItem('SocializeIdToken', `Bearer ${res.data.token}`)
        axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        setForm({ ...form, loading: false })
        setLoggedIn(true)
      })
      .catch(err => {
        setForm({ ...form, loading: false, errors: err.response.data })
      })
  }
  const handleChange = (event) => {
    const newForm = {}
    newForm[event.target.name] = event.target.value
    setForm({ ...form, ...newForm })
  }
  if (props.auth) setLoggedIn(true)
  if (loggedIn) {
    return (<Redirect to='/' />)
  }
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt='socialize' className={classes.image} height='100' />
        <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id='email' name='email' type='email' label='email'
            className={classes.textField} onChange={handleChange} value={form.email}
            error={!!form.errors.email} helperText={form.errors.email} fullWidth
          />
          <TextField
            id='password' name='password' type='password' label='password'
            className={classes.textField} onChange={handleChange} value={form.password}
            error={!!form.errors.password} helperText={form.errors.password} fullWidth
          />
          {form.errors.general && (
            <Typography variant='body2' className={classes.customError}>{form.errors.general}</Typography>
          )}
          <Button
            type='submit' variant='contained' color='primary'
            className={classes.button} disabled={form.loading}
          >
              LOGIN
          </Button>
          <br />
          <small>
            dont have an account ? sign up <Link to='/signup'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}

export default Login
