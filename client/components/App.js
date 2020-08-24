import React, {Component} from "react";
import fetch from "isomorphic-fetch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Octicon, {MarkGithub} from "@primer/octicons-react";
import Languages from "./Languages.js";

import {useAuth} from "../auth.js";
import style from "./App.css";

function Login() {
  return (
    <a className={style.login} href="/auth/github">
      Login with github <Octicon verticalAlign="middle" icon={MarkGithub} />
    </a>
  );
}

function Offline() {
  return (
    <div className={style.offline}>
      <h1>Starsman ✨</h1>
      <Login />
    </div>
  );
}

function Online() {
  return (
    <React.Fragment>
      <Header />
      <div className={style.main}>
        <div className={style.left}>
          <Languages loading={false} />
        </div>
        <div className={style.right}>
          <Repositories />
        </div>
      </div>
    </React.Fragment>
  );
}

export default function App() {
  let {user, isLoading} = useAuth();
  if (isLoading) {
    return null;
  } else {
    if (user.id) {
      return <Online />;
    }
    return <Offline />;
  }
}
