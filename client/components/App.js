import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Languages from "./Languages.js";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div
          style={{
            display: "flex",
            margin: "0 auto",
            maxWidth: "70em",
            paddingTop: "1em"
          }}
        >
          <div style={{ flex: 2 }}>
            <Languages loading={false} />
          </div>
          <div style={{ flex: 3, paddingLeft: "1em" }}>
            <Repositories />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
