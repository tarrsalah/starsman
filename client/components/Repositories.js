import React, {Component, Fragment} from "react";
import {FixedSizeList as List} from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Repository from "./Repository.js";
import styles from "./Repositories.css";

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
        <h2>
          📄 Repositories
          <span className="badge badge-light">({repos.length})</span>
          {isLoading && <span>...</span>}
        </h2>
        <div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label>
              <input
                name="filter"
                type="search"
                autoComplete="off"
                autoCorrect="off"
                onChange={handleFilter.bind(this)}
                placeholder="Find repositories..."
              />
            </label>
          </form>

          <div className={styles.repositories}>
            <AutoSizer>
              {({height, width}) => (
                <List
                  height={height}
                  itemCount={repos.length}
                  itemSize={140}
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
