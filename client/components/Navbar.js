import React, { Component } from "react";

import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function Profile({ user }) {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        <img
          width="30px"
          src={user.avatar_url}
          className="rounded-circle mr-2"
        />
        {user.username}
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <NavLink href="/setting">Settings</NavLink>
        </DropdownItem>
        <DropdownItem>
          <NavLink href="/logout">Logout</NavLink>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

function Login() {
  return <NavLink href="/auth/github">Login</NavLink>;
}

function Header({ auth }) {
  const { isAuthenticated, user } = auth;
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">✨ Starsman</NavbarBrand>
        <Nav className="ml-auto" navbar>
          {isAuthenticated ? <Profile user={user} /> : <Login />}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
