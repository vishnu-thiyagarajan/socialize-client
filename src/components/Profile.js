import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'
// import ProfileSkeleton from '../../util/ProfileSkeleton'
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'
import EditIcon from '@material-ui/icons/Edit'
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'
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
const Profile = (props) => {
  // const blankImg = require('../images/blank.png')
  const classes = styles()
  const [profile, setProfile] = useState(null)
  const [logout, setLogout] = useState(null)
  const handleProfile = (newState) => {
    setProfile({ ...profile, ...newState })
  }
  useEffect(() => {
    if (props.user) {
      const token = localStorage.SocializeIdToken
      axios.defaults.headers.common.Authorization = token
      axios.get('/user')
        .then(res => setProfile(res.data.credentials))
    }
  }, [props])
  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput')
    fileInput.click()
  }
  const handleImageChange = (event) => {
    const image = event.target.files[0]
    const formData = new FormData()
    formData.append('image', image, image.name)
    axios.post('/uploadImg', formData)
      .then(res => res.data.imageUrl)
      .then(imageUrl => setProfile({ ...profile, imageUrl: imageUrl }))
  }
  if (!profile) { return (<div />) }
  if (logout) { return (<Redirect to='/logout' />) }
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={profile.imageUrl || '../images/blank.png' } alt='profile' className='profile-image' />
          <input
            type='file'
            id='imageInput'
            hidden='hidden'
            onChange={handleImageChange}
          />
          <MyButton
            tip='Edit profile picture'
            onClick={handleEditPicture}
            btnClassName='button'
          >
            <EditIcon color='primary' />
          </MyButton>
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
        <MyButton tip='Logout' onClick={() => setLogout(true)}>
          <KeyboardReturn color='primary' />
        </MyButton>
        <EditDetails setProfile={handleProfile} />
      </div>
    </Paper>
  )
}

export default Profile
