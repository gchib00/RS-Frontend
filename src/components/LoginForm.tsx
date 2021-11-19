import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Form } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'
import BasicErrorMessage from './misc/BasicErrorMessage'

//styling:
const LoginBtn = styled.button`
  transition: 650ms;
  width: 240px;
  height: 40px;
  background-color: grey;
  color: white;
  border-radius: 2px;
  border: 1px solid grey;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: grey;
  }
  &:active {
    opacity: 0.25;
  }
`
const ErrorContainer = styled.div`
  max-width: 240px;
  margin-top: 10px;
`
/////////

export const LoginForm = () => {
  const {register, handleSubmit} = useForm()
  const {setUser} = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorVisibility, setErrorVisibility] = useState<boolean>(false)
  const navigate = useNavigate()

  const lognFormSubmit = async (data: any) => {
    // console.log('login data:', data)
    try {
      const response = await axios.post('http://localhost:3005/auth/login', data)
      localStorage.setItem('userToken', response.data.token)
      setUser(response.data.user)
      navigate('/', {replace: true})
    } catch (err: any) {
      setErrorMsg(err.response.data)
      setErrorVisibility(true)
    }
  }
  
  return (
    <Form onSubmit={handleSubmit(lognFormSubmit)} style={{margin: 'auto'}} autoComplete="off"  onClick={() => setErrorVisibility(false)}>
      <h4 style={{textAlign: 'center'}}>Login with an existing user</h4>
      <Form.Field>
          <input placeholder='Username' {...register('username')} style={{width:240}}/>
        </Form.Field>
        <Form.Field>
          <input type='password' placeholder='Password' {...register('password')} />
      </Form.Field>
      <LoginBtn type='submit'>Login</LoginBtn>
      <ErrorContainer>
        <BasicErrorMessage text={errorMsg} visibility={errorVisibility} />
      </ErrorContainer>
    </Form>
  )
}
