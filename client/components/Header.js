import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import styles from "./Header.css";

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
  render() {
    const { user } = this.props.authStore;

    return (
      <header className={styles.header}>
        <nav>
          <a href="/"> ✨ Starsman </a>
          <Profile user={user} />
        </nav>
      </header>
    );
  }
}

export default Header;
