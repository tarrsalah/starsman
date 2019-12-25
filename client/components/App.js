import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import Header from "./Header.js";
import Repositories from "./Repositories.js";
import Languages from "./Languages.js";
import { observer, inject } from "mobx-react";
import style from "./App.css";

@inject("authStore")
@observer
class App extends Component {
  componentDidMount() {
    this.props.authStore.fetch();
  }

  render() {
    const { isAuthenticated } = this.props.authStore;
    return (
      <React.Fragment>
        <Header />
        {isAuthenticated && (
          <div className={style.main}>
            <div className={style.left}>
              <Languages loading={false} />
            </div>
            <div className={style.right}>
              <Repositories />
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
