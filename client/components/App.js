import React, { Component } from "react";
import fetch from "isomorphic-fetch";

import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";
import Tags from "./Tags.js";
import Languages from "./Languages.js";

class App extends Component {
  state = {
    auth: {
      isLoading: true,
      error: false,
      user: {},
      isAuthenticated: false
    },
    starredRepos: {
      isLoading: true,
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

      await this.fetchStarredRepos();
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

    let url = "http://localhost:3000/api/starred";

    this.setState(prevState => {
      return {
        ...prevState,
        starredRepos: {
          ...prevState.starredRepos,
          repos: [],
          isLoading: true
        }
      };
    });

    try {
      let hasNextPage = true;
      let endCursor;

      while (hasNextPage) {
        let actualURL = url;
        if (hasNextPage && endCursor) {
          actualURL = actualURL + "?next=" + endCursor;
        }

        let response = await fetch(actualURL, options);

        if (response.status != 200) {
          return Promise.reject(response);
        }

        let json = await response.json();

        hasNextPage = json.hasNextPage;
        endCursor = json.endCursor;

        this.setState(prevState => {
          let starredRepos = prevState.starredRepos.repos;
          starredRepos.push(...json.repos);

          return {
            ...prevState,
            starredRepos: {
              ...prevState.starredRepos,
              repos: starredRepos
            }
          };
        });
      }
    } catch (err) {
      return Promise.reject(err);
    }

    let starredRepos = Object.assign({}, this.state.starredRepos);
    starredRepos.isLoading = false;
    this.setState({ starredRepos });

    return Promise.resolve();
  }

  render() {
    const { auth, starredRepos } = this.state;

    const tags = [
      { id: 0, text: "backend", count: 20 },
      { id: 1, text: "privacy", count: 30 },
      { id: 2, text: "node", count: 7 }
    ];

    const languages = [{ name: "Go", count: 120 }, { name: "PHP", count: 130 }];

    return (
      <React.Fragment>
        <Navbar auth={auth} />
        <Container className="my-4">
          <Row>
            <Col>
              <Tags tags={tags} loading={false} />
              <Languages languages={languages} loading={false} />
            </Col>

            <Col md="8">
              <Repositories starredRepos={starredRepos} />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
