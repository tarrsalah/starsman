import React from "react";

import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";

function App() {
  let repositories = [
    {
      id: 1,
      link: "https://github.com/primer/octicons",
      name: "primer/octicons",
      description: "A scalable set of icons handcrafted with <3 by GitHub "
    }
  ];

  let user = {
    username: "tarrsalah",
    avatar_url: "https://avatars1.githubusercontent.com/u/909959?s=40&v=4"
  };
  return (
    <React.Fragment>
      <Navbar user={user} isAuthenticated={true} />
      <Repositories repositories={repositories} />
    </React.Fragment>
  );
}

export default App;
