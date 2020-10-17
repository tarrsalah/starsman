import React from "react";
import {MarkGithubIcon} from "@primer/octicons-react";

function Login() {
  return (
    <a href="/auth/github">
      Login with github <MarkGithubIcon/>
    </a>
  );
}

export default function () {
  return (
    <div>
      <h1>Starsman ✨</h1>
      <Login />
    </div>
  );
}
