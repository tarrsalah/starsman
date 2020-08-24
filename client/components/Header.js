import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { useAuth } from "../auth.js";
import styles from "./Header.css";

function Profile({ user }) {
  return (
    <a className="pull-right" href="/logout">
      Logout
    </a>
  );
}

export default function Header() {
  const user  = useAuth();
  return (
    <header className={styles.header}>
      <nav>
        <a href="/"> ✨ Starsman </a>
        <Profile user={user} />
      </nav>
    </header>
  );
}
