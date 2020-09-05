import React from "react";
import Octicon, {MarkGithub} from "@primer/octicons-react";
import style from "./App.css";

function Login() {
  return (
    <a className={style.login} href="/auth/github">
      Login with github <Octicon verticalAlign="middle" icon={MarkGithub} />
    </a>
  );
}

export default function () {
  return (
    <div className={style.offline}>
      <h1>Starsman ✨</h1>
      <Login />
    </div>
  );
}
