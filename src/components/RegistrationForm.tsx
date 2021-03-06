import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox, CheckboxProps, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import BasicErrorMessage from './misc/BasicErrorMessage'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

//styling:
const RegisterBtn = styled.button`
  text-align: center;
  transition: 650ms;
  width: 240px;
  height: 40px;
  background-color: rgb(23, 158, 18);
  color: white;
  border-radius: 2px;
  border: 1px solid rgb(23, 158, 18);
  font-family: 'Montserrat', sans-serif;
  cursor: pointer;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(23, 158, 18);
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

interface FormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export const RegistrationForm = () => {
  const {register, handleSubmit} = useForm()
  const {setUser} = useContext(UserContext)
  const [adminRights, setAdminRights] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [errorVisibility, setErrorVisibility] = useState<boolean>(false)
  const navigate = useNavigate()

  const registrationFormSubmit = async (data: FormData) => {
    setErrorVisibility(false)
    if(data.password1 !== data.password2) {
      return alert(`Passwords don't match!`)
    } 
    const processedData = {
      ...data, 
      password: data.password1,
      adminRights: adminRights
    }
    try {
      await axios.post('/auth/register', processedData)
      try {
        const response = await axios.post('/auth/login', { //auto-login after registration
          username: processedData.username,
          password: processedData.password
        })
        setUser(response.data.user)
        navigate('/', {replace: true})
      } catch (err: unknown) {
        console.error('couldnt auto-login:', err)
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrorMsg(err.response.data)
      setErrorVisibility(true)
    }
  }


  const changeAdminRights = (value: CheckboxProps) => {
    if (value.checked !== undefined){setAdminRights(value.checked)}
  }

  return (
    <Form onSubmit={handleSubmit(registrationFormSubmit)} style={{margin: 'auto'}}>
      <h4 style={{textAlign: 'center'}}>Register a new user</h4>
      <Form.Field>
        <input placeholder='Choose Username' {...register('username')} style={{width:240}} autoComplete="username"/>
      </Form.Field>
      <Form.Field>
        <input type='email' placeholder='Email' {...register('email')} style={{width:240}} autoComplete="email"/>
      </Form.Field>
      <Form.Field>
        <input type='password' placeholder='Choose Password' {...register('password1')} style={{width:240}} autoComplete="new-password"/>
      </Form.Field>
      <Form.Field>
        <input type='password' placeholder='Repeat Password' {...register('password2')} style={{width:240}} autoComplete="new-password"/>
      </Form.Field>
      <Form.Field>
        <Checkbox 
          label='Request admin rights' 
          style={{marginLeft: '40px'}} 
          onChange={(e, value) => changeAdminRights(value)}
        />
      </Form.Field>
      <RegisterBtn type='submit'>Register</RegisterBtn>
      <ErrorContainer>
        <BasicErrorMessage text={errorMsg} visibility={errorVisibility} />
      </ErrorContainer>
    </Form>
  )
}