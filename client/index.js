import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.js";
import { AuthProvider } from "./auth.js";
import "./style.pcss";

ReactDOM.render(
  <AuthProvider>
      <App />
  </AuthProvider>,
  document.getElementById("root")
);
