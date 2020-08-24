import React, { Fragment } from "react";
import styles from "./Language.css";

export default function Language({ language }) {
  if (!language) {
    return null;
  }

  return (
    <Fragment>
      <span
        className={styles.language}
        style={{
          backgroundColor: language.color,
        }}
      />
      <span> {language.name}</span>
    </Fragment>
  );
}
