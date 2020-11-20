import React, { Fragment } from "react";
import Truncate from "react-truncate";
import { StarIcon, RepoForkedIcon } from "@primer/octicons-react";

const k = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

function Language({ language }) {
  if (!language) {
    return null;
  }

  return (
    <Fragment>
      <span
        className="inline-block rounded-xl w-3 h-3 mr-2"
        style={{
          backgroundColor: language.color,
        }}
      />
      <span />
      <span className="mr-6">{language.name}</span>
    </Fragment>
  );
}

function Stargazers({ count }) {
  return (
    <span className="mr-6">
      <StarIcon /> {k(count)}
    </span>
  );
}

function Forked({ count }) {
  return (
    <span>
      <RepoForkedIcon /> {k(count)}
    </span>
  );
}

export default function Repository({ repository }) {
  return (
    <div>
      <h3 className="font-bold text-lg text-blue-500 mb-2">
        <a href={repository.url}>{repository.nameWithOwner}</a>
      </h3>

      <p className="mb-4 leading-6 text-sm">
        <Truncate>{repository.description}</Truncate>
      </p>

      <div className="text-sm text-gray-900">
        <Language language={repository.primaryLanguage} />
        <Stargazers count={repository.stargazers.totalCount} />
        <Forked count={repository.forkCount} />
      </div>
    </div>
  );
}
