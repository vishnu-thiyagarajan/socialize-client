import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core'

const styles = makeStyles({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  }
})

const Comments = (props) => {
  const classes = styles()
  return (
    <Grid container>
      {props.comments && props.comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment
        return (
          <Fragment key={index}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt='comment'
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant='h5'
                      component={Link}
                      to={`/users/${userHandle}`}
                      color='primary'
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr />
                    <Typography variabnt='body1'>{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== props.comments.length - 1 && (
              <hr />
            )}
          </Fragment>
        )
      })}
    </Grid>
  )
}

export default Comments
