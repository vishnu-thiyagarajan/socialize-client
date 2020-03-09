import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout = (props) => {
  localStorage.removeItem('SocializeIdToken')
  const history = useHistory()
  console.log('redirecting...')
  history.push('/login')
  useEffect(() => {
    props.setAuth(false)
  }, [])
  return (<div />)
}

export default Logout
