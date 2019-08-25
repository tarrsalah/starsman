import React, { Component, Fragment } from "react";

import {
  Button,
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

function Login() {
  return (
    <NavLink
      style={{ lineHeight: "30px", fontSize: "1.2em" }}
      href="/auth/github"
    >
      Login
    </NavLink>
  );
}

function Logout() {
  return (
    <NavLink style={{ lineHeight: "30px", fontSize: "1.2em" }} href="/logout">
      Logout
    </NavLink>
  );
}

function Profile({ user }) {
  return (
    <Fragment>
      <Logout />

      <NavItem style={{ lineHeight: "30px", fontSize: "1.2em" }}>
        <NavLink>
          <img
            width="30px"
            src={user.avatar_url}
            className="rounded-circle mr-2"
          />
          {user.username}
        </NavLink>
      </NavItem>
    </Fragment>
  );
}

function Header({ auth }) {
  const { isAuthenticated, user } = auth;
  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">✨ Starsman</NavbarBrand>

        <Nav navbar>
          <NavItem>
            <NavLink href="/" style={{ lineHeight: "30px", fontSize: "1.2em" }}>
              📥 Sync
            </NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          {isAuthenticated ? <Profile user={user} /> : <Login />}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
