import React, {Component, Fragment} from "react";
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Repository from "./Repository.js";

class Repositories extends Component {
  constructor(props) {
    super(props);
    this.timeout = 0;
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const {repos, isLoading, count, handleFilter} = this.props;
    const Row = ({index, style}) => (
      <div style={style}>
        <Repository repository={repos[index]} />
      </div>
    );

    return (
      <section>
        <h1 className="font-bold text-2xl">
          📄 Repositories
          <span className="badge badge-light">({repos.length})</span>
          {isLoading && <span>...</span>}
        </h1>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="label">
              <input
                className="leading-normal border-2 border-gray-100 w-full px-10 py-2"
                name="filter"
                type="search"
                autoComplete="off"
                autoCorrect="off"
                onChange={handleFilter.bind(this)}
                placeholder="Find repositories..."
              />
            </label>
          </form>

          <div className="min-h-screen py-4 pl-4 mt-4 border-2 border-gray-100">
            <AutoSizer>
              {({height, width}) => (
                <List
                  height={height}
                  itemCount={repos.length}
                  itemSize={160}
                  width={width}
                >
                  {Row}
                </List>
              )}
            </AutoSizer>
          </div>
        </div>
      </section>
    );
  }
}

export default Repositories;
