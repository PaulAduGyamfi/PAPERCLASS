import Button from '../elements/button'
import Router from 'next/router'

const LoginPage = () => {
  const loginIn = async () => {
    Router.push('/api/user/auth/google')
  }
  return (
    Button("Click Me", loginIn)
  )
}

export default LoginPage