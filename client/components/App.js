import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import { Container, Row, Col } from "reactstrap";
import Navbar from "./Navbar.js";
import Repositories from "./Repositories.js";
import Tags from "./Tags.js";
import Languages from "./Languages.js";

class App extends Component {
  render() {
    const tags = [
      { id: 0, text: "backend", count: 20 },
      { id: 1, text: "privacy", count: 30 },
      { id: 2, text: "node", count: 7 }
    ];

    const languages = [
      { name: "Go", count: 120 },
      { name: "PHP", count: 130 },
      { name: "Clojure", count: 54 }
    ];

    return (
      <React.Fragment>
        <Container className="my-4">
          <Row>
            <Col>
              <Tags tags={tags} loading={false} />
              <Languages languages={languages} loading={false} />
            </Col>

            <Col md="8">
              <Repositories />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
