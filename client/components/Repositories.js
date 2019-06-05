import React from "react";
import { Container } from "reactstrap";
import Repository from "./Repository.js";

const Repositories = ({ repositories }) => {
  return (
    <Container className="px-5 mt-4">
      <h2 className="h6 text-uppercase mb-3">
        <strong>Repositories</strong>
      </h2>
      {repositories.map(repository => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </Container>
  );
};

export default Repositories;
