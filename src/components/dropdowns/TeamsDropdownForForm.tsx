import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../../context/EmployeesContext'

//Styling:
const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 14px 0px 4px 0px;
`
/////////
interface Team {
  key: string;
  text: string;
  value: string;
}
interface Props {
  selectedDepartment: string | undefined;
  setSelectedTeam: React.Dispatch<React.SetStateAction<string|undefined>>;
}

const TeamsDropdownForForm = ({selectedDepartment, setSelectedTeam}: Props) => {
  const [selectedOption, setSelectedOption] = useState('')
  const [dropdownDisabled, setDropdownDisabled] = useState(true)
  const {employeesData} = useContext(EmployeesContext)

  //populate editorTeams with team options
  const deptTeams: Team[] = []
  //in case of cs and editing departments, offer 'none' as an option:
  selectedDepartment!=='operations' ? deptTeams.push({key: 'None', text: 'None', value: 'None'}): null;

  employeesData.map(employee => {
    if (selectedDepartment === 'cs' ||selectedDepartment === 'editing'){
      if (employee.department === selectedDepartment && employee.team) {
        const teamOption: Team =  {
          key: employee.team,
          text: employee.team,
          value: employee.team
        }
        //add option only if hasn't already been added:
        deptTeams.some(option => option.key === teamOption.key) ? null : deptTeams.push(teamOption)
      }
    }
    if (selectedDepartment === 'operations'){
      if (employee.department === selectedDepartment && employee.subDepartment) {
        const teamOption: Team =  {
          key: employee.subDepartment,
          text: employee.subDepartment,
          value: employee.subDepartment
        }
        //add option only if hasn't already been added:
        deptTeams.some(option => option.key === teamOption.key) ? null : deptTeams.push(teamOption)
      }
    }
  })

  useEffect(() => {
    setSelectedTeam(selectedOption)
  }, [selectedOption])

  useEffect(() => {
    setSelectedTeam(undefined)
    if (selectedDepartment !== '') {
      setDropdownDisabled(false)
    } else {
      setSelectedOption('')
      setDropdownDisabled(true)
    }
  }, [selectedDepartment]) 

  const getTitle = () => {
    switch(selectedDepartment){
      case('editing'): {return 'Editor Teams: '}
      case('cs'): {return 'CS Teams: '}
      case('operations'): {return 'Sub-Department: '}
    }
  }

  if(dropdownDisabled === true) {return null}
  return (
    <DropdownContainer>
      <strong style={{marginBottom: 5}}>
        {getTitle()}<span style={{color: 'red'}}>*</span>
      </strong>
      <Dropdown
        disabled={dropdownDisabled}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(e, {value}: any) => setSelectedOption(value)}
        value={selectedOption}
        options={deptTeams}
        placeholder='Select'
        selection
      />
    </DropdownContainer>    
  )
}
export default TeamsDropdownForForm