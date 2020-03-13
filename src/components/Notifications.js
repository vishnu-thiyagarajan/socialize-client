import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'

const Notifications = (props) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])
  const handleOpen = (event) => {
    setAnchorEl(event.target)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const onMenuOpened = () => {
    // let unreadNotificationsIds = this.props.notifications
    //   .filter((not) => !not.read)
    //   .map((not) => not.notificationId);
    // this.props.markNotificationsRead(unreadNotificationsIds);
  }
  dayjs.extend(relativeTime)
  let notificationsIcon
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationsIcon = (
        <Badge
          badgeContent={
            notifications.filter((not) => not.read === false).length
          }
          color='secondary'
        >
          <NotificationsIcon />
        </Badge>
      ))
      : (notificationsIcon = <NotificationsIcon />)
  } else {
    notificationsIcon = <NotificationsIcon />
  }
  const notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          const verb = not.type === 'like' ? 'liked' : 'commented on'
          const time = dayjs(not.createdAt).fromNow()
          const iconColor = not.read ? 'primary' : 'secondary'
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            )

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography
                component={Link}
                color='default'
                variant='body1'
                to={`/users/${not.recipient}/scream/${not.screamId}`}
              >
                {not.sender} {verb} your scream {time}
              </Typography>
            </MenuItem>
          )
        })
      ) : (
        <MenuItem onClick={handleClose}>
          You have no notifications yet
        </MenuItem>
      )
  return (
    <>
      <Tooltip placement='top' title='Notifications'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </>
  )
}

export default Notifications
