import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import Repositories from "./components/Repositories";
import "./style.scss";

const App = () => {
  let repositories = [
    {
      id: 1,
      link: "https://github.com/primer/octicons",
      name: "primer/octicons",
      description: "A scalable set of icons handcrafted with <3 by GitHub "
    }
  ];
  return (
    <div>
      <Header />
      <Repositories repositories={repositories} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
