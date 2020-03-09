import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const styles = makeStyles({})
const Profile = (props) => {
  console.log(props)
  const classes = styles()
  return (
    <div>
      {props.user && <div>{props.user.email}</div>}
    </div>
  )
}

export default Profile