import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Spinner } from "reactstrap";
import Repository from "./Repository.js";

@inject("repositoriesStore")
@observer
class Repositories extends Component {
  componentDidMount() {
    this.props.repositoriesStore.fetch();
  }

  render() {
    const { repositories, isLoading, count } = this.props.repositoriesStore;

    return (
      <Fragment>
        <div>
          <h1 className="h4 font-weight-bolder">
            📄 Repositories
            <span className="badge badge-light">({count})</span>
            {isLoading && (
              <Spinner
                className="ml-4"
                color="secondary"
                style={{ width: "1em", height: "1em" }}
              />
            )}
          </h1>
        </div>
        {repositories.map(repository => (
          <Repository key={repository.id} repository={repository} />
        ))}
      </Fragment>
    );
  }
}

export default Repositories;
