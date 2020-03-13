import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import MyButton from '../util/MyButton'
import PostAPost from './PostAPost'
import Notifications from './Notifications'
import HomeIcon from '@material-ui/icons/Home'
const Link = require('react-router-dom').Link

const NavBar = (props) => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        {props.auth && (
          <>
            <PostAPost setPosts={props.setPosts} />
            <Link to='/'>
              <MyButton tip='Home'>
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </>
        )}
        {!props.auth && (
          <>
            <Button color='inherit' component={Link} to='/'>Home</Button>
            <Button color='inherit' component={Link} to={props.auth ? '/' : '/signup'}>SignUp</Button>
            <Button color='inherit' component={Link} to={props.auth ? '/' : '/login'}>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
