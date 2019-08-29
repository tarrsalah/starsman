import React, { Fragment, Component } from "react";
import { observer, inject } from "mobx-react";
import { Spinner, Badge } from "reactstrap";

function Language({ name, count }) {
  return (
    <li className="language">
      <span> {name}</span>
      <span className="badge badge-light"> ({count})</span>
    </li>
  );
}

@inject("repositoriesStore")
@observer
class Languages extends Component {
  render() {
    let languages = this.props.repositoriesStore.languages;
    return (
      <Fragment>
        <h2 className="h5 font-weight-bolder mb-3">
          <span className="mr-2">📈 Languages</span>
        </h2>
        <ul>
          {Array.from(languages).map(language => {
            return (
              <Language
                key={language[0]}
                name={language[0]}
                count={language[1]}
              />
            );
          })}
        </ul>
      </Fragment>
    );
  }
}

export default Languages;
