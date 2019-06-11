import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";
import Tags from "./Tags.js";

class App extends Component {
  state = {
    auth: {
      isLoading: false,
      error: false,
      user: {},
      isAuthenticated: false
    },
    starredRepos: {
      isLoading: false,
      error: false,
      repos: []
    }
  };

  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchStarredRepos = this.fetchStarredRepos.bind(this);
  }

  async componentDidMount() {
    this.setState(prevState => {
      return {
        ...prevState,
        auth: {
          ...prevState.auth,
          isLoading: true
        }
      };
    });

    try {
      let user = await this.fetchUser();
      this.setState(prevState => {
        return {
          ...prevState,
          auth: {
            ...prevState.auth,
            isLoading: false,
            isAuthenticated: true,
            user
          }
        };
      });
    } catch (err) {
      this.setState(prevState => {
        return {
          ...prevState,
          auth: {
            ...prevState.auth,
            isAuthenticated: false,
            error: true,
            isLoading: false
          }
        };
      });
    }

    try {
      this.setState(prevState => {
        return {
          ...prevState,
          starredRepos: {
            ...prevState.starredRepos,
            isLoading: true
          }
        };
      });

      let starredRepos = await this.fetchStarredRepos();
      this.setState(prevState => {
        return {
          ...prevState,
          starredRepos: {
            ...prevState.starredRepos,
            repos: starredRepos.repos,
            isLoading: false
          }
        };
      });
    } catch (err) {
      this.setState(prevState => {
        return {
          ...prevState,
          starredRepos: {
            ...prevState.starredRepos,
            error: true,
            isLoading: false
          }
        };
      });
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
    const { auth, starredRepos } = this.state;

    const tags = [
      { id: 0, text: "backend", color: "blue", count: 20 },
      { id: 1, text: "privacy", color: "black", count: 30 },
      { id: 2, text: "node", color: "yellow", count: 7 }
    ];
    return (
      <React.Fragment>
        <Navbar auth={auth} />
        <Container className="my-4">
          <Row>
            <Col xs="8">
              <Repositories starredRepos={starredRepos} />
            </Col>
            <Col>
              <Tags tags={tags} loading={false} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;