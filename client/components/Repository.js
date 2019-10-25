import React, { Fragment } from "react";
import Octicon, { Star, RepoForked, Repo } from "@primer/octicons-react";
import styles from "./Repository.css";

const Repository = ({ repository }) => {
  const language = repository.primaryLanguage;
  return (
    <div className={styles.repository}>
      <h3>
        <Octicon icon={Repo} />
        <a href={repository.url}>{repository.nameWithOwner}</a>
      </h3>

      <p>{repository.description}</p>

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
          <Octicon icon={Star} /> {repository.stargazers.totalCount}
        </span>
        <span>
          <Octicon icon={RepoForked} /> {repository.forkCount}
        </span>
      </div>
    </div>
  );
};

export default Repository;
