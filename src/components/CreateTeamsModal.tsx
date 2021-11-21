import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

//styling:
const MainContainer = styled.div`
  width: 340px;
  max-height: 320px;
  margin: 40px auto 40px auto;
`
const BtnContainer = styled.div`
  display: flex;
  width: 146px;
  justify-content: space-between;
  margin: 30px auto auto auto;
`
const SubmitBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: rgb(23, 158, 18);
  color: white;
  border-radius: 2px;
  border: 1px solid rgb(23, 158, 18);
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(23, 158, 18);
  }
  &:active {
    opacity: 0.25;
  }
`
const CancelBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
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
////////

interface Props {
  formModalStatus: boolean;
  setFormModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
  department: string;
}

export const CreateTeamsModal = ({formModalStatus, setFormModalStatus, department}: Props) => {
  const {register, handleSubmit, reset} = useForm()
  return (
    <Modal
    style={{maxHeight: 400, width: 480}}
      onClose={() => {setFormModalStatus(false); reset()}}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    <MainContainer>
      <Form autoComplete="off" onSubmit={handleSubmit(() => alert(`new team should be added in ${department}`))}>
        <Form.Field>
          <label style={{marginBottom: 5}}>Name of the new {department === 'cs' ? 'CS' : 'editor' } team:</label>
          <input {...register('newTeamName')} />
        </Form.Field>
        <Form.Field>
          <label>Team Leader (must be an existing member):</label>
          <input {...register('newTeamName')} />
        </Form.Field>
        <BtnContainer>
          <CancelBtn type='button' onClick={() => {setFormModalStatus(false); reset()}}>Cancel</CancelBtn>
          <SubmitBtn type='submit'>Submit</SubmitBtn> 
        </BtnContainer>
      </Form>
    </MainContainer>
    </Modal>
  )
}