import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: {}
  };

  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await this.fetchUser();
      this.setState({ isAuthenticated: true, user });
    } catch (err) {
      this.setState({ isAuthenticated: false });
    }
  }

  async fetchUser() {
    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await fetch("http://localhost:3000/api/user", options);
      if (response.status != 200) {
        return Promise.reject(response);
      }
      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  render() {
    let repositories = [
      {
        id: 1,
        link: "https://github.com/primer/octicons",
        name: "primer/octicons",
        description: "A scalable set of icons handcrafted with <3 by GitHub "
      }
    ];

    return (
      <React.Fragment>
        <Navbar
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
        />
        <Repositories repositories={repositories} />
      </React.Fragment>
    );
  }
}

export default App;
