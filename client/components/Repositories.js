import React from "react";
import { Container, Spinner } from "reactstrap";
import Repository from "./Repository.js";

const Repositories = ({ starredRepos }) => {
  const { repos, isLoading } = starredRepos;
  return (
    <Container className="px-5 mt-4">
      <h2 className="h6 text-uppercase mb-3">
        <strong>Repositories</strong>
      </h2>
      {!isLoading ? (
        repos.map(repository => (
          <Repository key={repository.id} repository={repository} />
        ))
      ) : (
        <div className="mt-3 row justify-content-center align-items-center">
          <Spinner
            color="secondary"
            style={{ width: "4rem", height: "4rem" }}
          />
        </div>
      )}
    </Container>
  );
};

export default Repositories;
