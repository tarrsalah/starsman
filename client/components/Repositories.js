import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import Repository from "./Repository.js";

const Repositories = ({ starredRepos }) => {
  const { repos, isLoading } = starredRepos;
  return (
    <Fragment>
      <div>
        <h1 className="h4 font-weight-bolder">
          📄 Repositories
          <span class="badge badge-light">({repos.length})</span>
          {isLoading && (
            <Spinner
              className="ml-4"
              color="secondary"
              style={{ width: "1em", height: "1em" }}
            />
          )}
        </h1>
      </div>
      {repos.map(repository => (
        <Repository key={repository.id} repository={repository} />
      ))}
    </Fragment>
  );
};

export default Repositories;
