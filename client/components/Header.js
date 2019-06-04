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

const Profile = ({ user }) => {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        <img
          width="30px"
          src={user.raw.avatar_url}
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
};

const Login = () => {
  return <NavLink href="/auth/github">Login</NavLink>;
};

class Header extends Component {
  state = {
    user: "",
    isAuthenticated: false
  };

  constructor(props) {
    super(props);
    this.fetchAuth = this.fetchAuth.bind(this);
  }

  componentDidMount() {
    this.fetchAuth()
      .then(user => {
        this.setState({ isAuthenticated: true, user: user.profile });
      })
      .catch(e => {
        this.setState({ isAuthenticated: false });
      });
  }

  fetchAuth() {
    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };

    return fetch("http://localhost:3000/api", options).then(response => {
      if (response.status !== 200) {
        return response.json().then(r => {
          return Promise.reject(r);
        });
      }
      return response.json();
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">✨ Starsman</NavbarBrand>

          <Nav className="ml-auto" navbar>
            {this.state.isAuthenticated ? (
              <Profile user={this.state.user} />
            ) : (
              <Login />
            )}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
