import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";

class App extends Component {
  state = {
    isAuthenticated: false,
    user: {},
    starredRepos: []
  };

  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchStarredRepos = this.fetchStarredRepos.bind(this);
  }

  async componentDidMount() {
    try {
      let user = await this.fetchUser();
      this.setState({ isAuthenticated: true, user });
    } catch (err) {
      this.setState({ isAuthenticated: false });
    }

    try {
      let starredRepos = await this.fetchStarredRepos();
      this.setState({ starredRepos: starredRepos.repos });
    } catch (err) {
      this.setState({ isAuthenticated: false, starredRepos: [] });
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

  async fetchStarredRepos() {
    let options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      let response = await fetch("http://localhost:3000/api/starred", options);
      if (response.status != 200) {
        return Promise.reject(response);
      }
      return response.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar
          user={this.state.user}
          isAuthenticated={this.state.isAuthenticated}
        />
        <Repositories repositories={this.state.starredRepos} />
      </React.Fragment>
    );
  }
}

export default App;
