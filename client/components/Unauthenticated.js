import React from "react";
import Octicon, {MarkGithub} from "@primer/octicons-react";

function Login() {
  return (
    <a href="/auth/github">
      Login with github <Octicon verticalAlign="middle" icon={MarkGithub} />
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
