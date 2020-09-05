import React, {Fragment, Component} from "react";
import styles from "./Languages.css";

class Languages extends Component {
  render() {
    let languages = this.props.languages;

    return (
      <div>
        <h3>📈 Filter by Language</h3>
        <ul className={styles.languages}>
          {Object.keys(languages).map((key) => {
            let language = languages[key];

            return (
              <li
                key={key}
                className={styles.language}
                onClick={this.handleClick}
              >
                <span>{language.name}</span>
                <span className={styles.count}>{language.count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Languages;
