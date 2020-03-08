import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import React from 'react'
const Link = require('react-router-dom').Link

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar className='nav-container'>
        <Button color='inherit' component={Link} to='/'>Home</Button>
        <Button color='inherit' component={Link} to='/signup'>SignUp</Button>
        <Button color='inherit' component={Link} to='/login'>Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
