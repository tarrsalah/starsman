import React from "react";
import ReactDOM from "react-dom";
import { Button } from "reactstrap";
import Header from "./components/Header.js";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <Header />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
