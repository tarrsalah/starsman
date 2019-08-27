import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./stores";
import App from "./components/App.js";

import "./style.scss";

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById("root")
);
