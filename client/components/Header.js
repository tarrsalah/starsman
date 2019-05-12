import React, { Component } from "react";

const Profile = ({ user }) => {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        <figure className="image" style={{ marginRight: "1em" }}>
          <img
            className="is-rounded"
            src={user.raw.avatar_url}
            alt="tarrsalah"
          />
        </figure>
        {user.username}
      </a>
      <div className="navbar-dropdown">
        <a href="/settings" className="navbar-item">
          Settings
        </a>
        <a href="/logout" className="navbar-item">
          Logout
        </a>
      </div>
    </div>
  );
};

const Login = () => {
  return (
    <div className="navbar-item">
      <div className="buttons">
        <a className="button is-link" href="/auth/github">
          <strong>Login</strong>
        </a>
      </div>
    </div>
  );
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
    console.log(this.state);
    return (
      <nav
        className="navbar has-shadow is-light"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container is-family-monospace">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <strong className="is-size-5">✨ Starsman</strong>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-end">
              {this.state.isAuthenticated ? (
                <Profile user={this.state.user} />
              ) : (
                <Login />
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
