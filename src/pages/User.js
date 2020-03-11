import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import { Link, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Post from '../components/Post'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import dayjs from 'dayjs'

const styles = makeStyles({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})
const User = (props) => {
  const classes = styles()
  const [profile, setProfile] = useState(null)
  const [open, setOpen] = useState(true)
  const [post, setPost] = useState(null)
  const token = localStorage.SocializeIdToken
  axios.defaults.headers.common.Authorization = token
  const handleClose = () => {
    props.match.params.postId = null
    setOpen(false)
  }
  useEffect(() => {
    const handle = props.match.params.handle
    const postId = props.match.params.postId
    if (!post && postId) {
      axios
        .get(`/posts/${postId}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.log(err))
    }
    if (!profile) {
      axios
        .get(`/user/${handle}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.log(err))
    }
  }, [post, profile, props])
  if (!token) return (<Redirect to='/login' />)
  if (!profile) return (<div />)
  return (
    <Grid container spacing={10}>
      <Grid item sm={4} xs={12}>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogContent>
            {post && <Post post={post} />}
          </DialogContent>
        </Dialog>
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (<div />) : (
          <Paper className={classes.paper}>
            <div className={classes.profile}>
              <div className='image-wrapper'>
                <img src={profile.imageUrl} alt='profile' className='profile-image' />
              </div>
              <hr />
              <div className='profile-details'>
                <MuiLink
                  component={Link}
                  to={`/users/${profile.handle}`}
                  color='primary'
                  variant='h5'
                >
                @{profile.handle}
                </MuiLink>
                <hr />
                {profile.bio && <Typography variant='body2'>{profile.bio}</Typography>}
                <hr />
                {profile.location && (
                  <>
                    <LocationOn color='primary' /> <span>{profile.location}</span>
                    <hr />
                  </>
                )}
                {profile.website && (
                  <>
                    <LinkIcon color='primary' />
                    <a href={profile.website} target='_blank' rel='noopener noreferrer'>
                      {' '}
                      {profile.website}
                    </a>
                    <hr />
                  </>
                )}
                <CalendarToday color='primary' />{' '}
                <span>Joined {dayjs(profile.createdAt).format('MMM YYYY')}</span>
              </div>
            </div>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}

export default User
