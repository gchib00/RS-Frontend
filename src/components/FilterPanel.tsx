import React, { useContext, useEffect, useState } from 'react'
import { Divider } from 'semantic-ui-react'
// import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { EmployeesContext } from '../context/EmployeesContext'
import { StandardEmployeeType } from '../types'
import DepartmentDropdown from './dropdowns/DepartmentDropdown'
import TeamsDropdown from './dropdowns/TeamsDropdown'


//Styling:
const MainContainer = styled.div`
  border: 2px solid #5a5a5a28;
  border-radius: 3px;
  background-color: #ffffff7a;
  margin: 10px 0px 10px 0px;
  padding: 14px;
  width: 100%;
  height: 300px;
`
const DeptDropdownStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
/////

interface Props {
  setPanelList: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>
}

const FilterPanel = ({setPanelList}: Props) => {
  const [filteredByDep, setFilteredByDep] = useState<StandardEmployeeType[]>([])
  const {employeesData} = useContext(EmployeesContext)

  const mainFilter = () => { //funnels all the filters into one array
    let arr = employeesData
    if (filteredByDep.length > 0) {
      arr = arr.filter(employee => {
        return filteredByDep.includes(employee)
      })
    }
    setPanelList(arr)
  }

  useEffect(() => {
    mainFilter()
  }, [filteredByDep])

  return(
    <MainContainer>
      <DeptDropdownStyle>
        Department:
        <DepartmentDropdown 
          setFilteredByDep={setFilteredByDep}
        />
      </DeptDropdownStyle>
      <Divider />
      <TeamsDropdown dept='editing'/>
      <TeamsDropdown dept='cs'/>
      <TeamsDropdown dept='operations'/>
    </MainContainer>
  )
}

export default FilterPanel