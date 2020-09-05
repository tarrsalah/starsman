import React, {Fragment, useState} from "react";
import styles from "./Languages.css";

export default function Languages({languages, toggleLanguage}) {
  function handleClick(name) {
    return function (e) {
      toggleLanguage(name);
    };
  }

  return (
    <div>
      <h3>📈 Filter by Language</h3>
      <ul className={styles.languages}>
        {Object.keys(languages).map((name) => {
          let language = languages[name];
          let selectedClass = language.selected? styles.selected: ""
          return (
            <li
              key={name}
              className={`${styles.language} ${selectedClass}`}
              onClick={handleClick(name)}
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
