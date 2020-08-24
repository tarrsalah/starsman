import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import stores from "./stores";
import App from "./components/App.js";
import { AuthProvider } from "./auth.js";
import "./style.css";

ReactDOM.render(
  <AuthProvider>
    <Provider {...stores}>
      <App />
    </Provider>
  </AuthProvider>,
  document.getElementById("root")
);
