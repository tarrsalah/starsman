import React, { Fragment } from "react";
import Octicon, { Star, RepoForked, Repo } from "@primer/octicons-react";
import styles from "./Repository.css";

const k = num => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

const Repository = ({ repository }) => {
  const language = repository.primaryLanguage;

  return (
    <div className={styles.repository}>
      <h3>
        <Octicon icon={Repo} />
        <a href={repository.url}>{repository.nameWithOwner}</a>
      </h3>

      <p className={styles.description}>{repository.description}</p>

      <div className={styles.footer}>
        {language && (
          <Fragment>
            <span
              className={styles.language}
              style={{
                backgroundColor: language.color
              }}
            />
            <span> {language.name}</span>
          </Fragment>
        )}
        <span>
          <Octicon icon={Star} /> {k(repository.stargazers.totalCount)}
        </span>
        <span>
          <Octicon icon={RepoForked} /> {k(repository.forkCount)}
        </span>
      </div>
    </div>
  );
};

export default Repository;
