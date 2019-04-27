import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import Repository from "./Repository.js";

@inject("repositoriesStore")
@observer
class Repositories extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  componentDidMount() {
    this.props.repositoriesStore.fetch();
  }

  handleChange(e) {
    e.preventDefault();
    if (this.timeout) clearTimeout(this.timeout);
    let searchText = e.target.value;

    this.timeout = setTimeout(() => {
      this.props.repositoriesStore.filter = searchText;
    }, 100);
  }

  render() {
    const { repositories, isLoading, count } = this.props.repositoriesStore;

    return (
      <section>
        <h2>
          📄 Repositories
          <span className="badge badge-light">({count})</span>
          {isLoading && <span>...</span>}
        </h2>
        <div className="repositories">
          <form>
            <input
              name="filter"
              onChange={this.handleChange.bind(this)}
              type="text"
              placeholder="Find repositories..."
            />
          </form>
          {repositories.map(repository => (
            <Repository key={repository.id} repository={repository} />
          ))}
        </div>
      </section>
    );
  }
}

export default Repositories;
