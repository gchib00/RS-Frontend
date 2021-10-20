import React from 'react'
import styled from 'styled-components'
import logo from '../static/images/logo.png'

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  height: 70px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
` 
const Logo = styled.img`
  margin-left: 24px;
  height: 46px;
  width: 84px;
`
const Nav = styled.nav`
  margin-right: 14px;
  height: 100%;
  width: 324px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const NavItem = styled.a`
  color: #cc1b1b;
  border-bottom: 2px solid white;
  min-width: 80px;
  font-size: 1.2rem;
  padding: 22px 0px 22px 0px;
  text-align: center;
  &:hover {
    border: none;
    color: #cc1b1b;
    border-bottom: 3px solid #cc1b1b;
  }
`

const Navbar = () => { 
  return(
    <Header>
      <Logo src={logo} />
      <Nav>
        <NavItem href="#">Trainees</NavItem>
        <NavItem href="#">Requests</NavItem>
        <NavItem href="#">Login</NavItem>
      </Nav>
    </Header>
  )
}

export default Navbar