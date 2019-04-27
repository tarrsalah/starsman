import React, { Fragment, Component } from "react";
import { observer, inject } from "mobx-react";
import styles from "./Languages.css";

@inject("repositoriesStore")
@observer
class Language extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.repositoriesStore.languagerFilters.push(this.props.language);
  }

  render() {
    let language = this.props.language;

    return (
      <li className={styles.language} onClick={this.handleClick}>
        <span>{language.name}</span>
        <span className={styles.count}>{language.count}</span>
      </li>
    );
  }
}

@inject("repositoriesStore")
@observer
class Languages extends Component {
  render() {
    let languages = this.props.repositoriesStore.languages;

    return (
      <div>
        <h3>📈 Filter by Language</h3>
        <ul className={styles.languages}>
          {Object.keys(languages).map(key => {
            let language = languages[key];
            return <Language key={language.name} language={language} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Languages;
