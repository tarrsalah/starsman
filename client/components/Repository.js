import React from "react";
import Octicon, { Star, RepoForked, Repo } from "@primer/octicons-react";
import Language from "./Language.js";
import styles from "./Repository.css";

const k = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

function Stargazers({ count }) {
  return (
    <span>
      <Octicon icon={Star} /> {k(count)}
    </span>
  );
}

function Forked({ count }) {
  return (
    <span>
      <Octicon icon={RepoForked} /> {k(count)}
    </span>
  );
}

export default function Repository({ repository }) {
  return (
    <div className={styles.repository}>
      <h3>
        <Octicon icon={Repo} />
        <a href={repository.url}>{repository.nameWithOwner}</a>
      </h3>

      <p className={styles.description}>{repository.description}</p>

      <div className={styles.footer}>
        <Language language={repository.primaryLanguage} />
        <Stargazers count={repository.stargazers.totalCount} />
        <Forked count={repository.forkCount} />
      </div>
    </div>
  );
}
