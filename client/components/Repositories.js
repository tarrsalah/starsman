import React from "react";
import { Container, Spinner } from "reactstrap";
import Repository from "./Repository.js";

const Repositories = ({ starredRepos }) => {
  const { repos, isLoading } = starredRepos;
  return (
    <Container className="px-5 mt-4">
      <h2 className="h6 text-uppercase mb-3">
        <span className="mr-2">Repositories</span>
        {isLoading && (
          <Spinner
            color="secondary"
            style={{ width: "1.5em", height: "1.5em" }}
          />
        )}
      </h2>
      {repos.map(repository => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </Container>
  );
};

export default Repositories;
