import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Logout = (props) => {
  localStorage.clear()
  const history = useHistory()
  console.log('redirecting...')
  history.push('/login')
  useEffect(() => {
    props.setUser(null)
    props.setAuth(false)
  }, [props])
  return (<div />)
}

export default Logout
