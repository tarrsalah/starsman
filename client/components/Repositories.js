import React, { Component, Fragment } from "react";
import { inject, observer } from "mobx-react";
import Repository from "./Repository.js";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

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

  handleSubmit(e) {
    e.preventDefault();
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
    const Row = ({ index, style }) => (
      <div style={style}>
        <Repository repository={repositories[index]} />
      </div>
    );

    return (
      <section>
        <h2>
          📄 Repositories
          <span className="badge badge-light">({count})</span>
          {isLoading && <span>...</span>}
        </h2>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input
              name="filter"
              onChange={this.handleChange.bind(this)}
              type="text"
              placeholder="Find repositories..."
            />
          </form>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={1000}
                itemCount={repositories.length}
                itemSize={150}
                width={width}
              >
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </section>
    );
  }
}

export default Repositories;
