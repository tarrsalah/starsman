import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import Repository from "./Repository.js";

const Repositories = ({ starredRepos }) => {
  const { repos, isLoading } = starredRepos;
  return (
    <Fragment>
      <h2 className="h4 font-weight-bolder mb-4">
        <span className="mr-4">📄 Repositories</span>
        {isLoading && (
          <Spinner color="secondary" style={{ width: "1em", height: "1em" }} />
        )}
      </h2>
      {repos.map(repository => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </Fragment>
  );
};

export default Repositories;
