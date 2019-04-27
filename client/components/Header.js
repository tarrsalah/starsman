import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import styles from "./Header.css";

function Login() {
  return (
    <a className="pull-right" href="/auth/github">
      Login
    </a>
  );
}

function Profile({ user }) {
  return (
    <a className="pull-right" href="/logout">
      Logout
    </a>
  );
}

@inject("authStore")
@observer
class Header extends Component {
  componentDidMount() {
    this.props.authStore.fetch();
  }

  render() {
    const { user, isAuthenticated } = this.props.authStore;

    return (
      <header className={styles.header}>
        <nav>
          <a href="/"> ✨ Starsman </a>
          {isAuthenticated ? <Profile user={user} /> : <Login />}
        </nav>
      </header>
    );
  }
}

export default Header;
