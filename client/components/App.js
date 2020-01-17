import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Octicon, { MarkGithub } from "@primer/octicons-react";
import Languages from "./Languages.js";
import { observer, inject } from "mobx-react";
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

@inject("authStore")
@observer
class App extends Component {
  componentDidMount() {
    this.props.authStore.fetch();
  }

  render() {
    const { isAuthenticated } = this.props.authStore;
    if (isAuthenticated) {
      return <Online />;
    }
    return <Offline />;
  }
}

export default App;
