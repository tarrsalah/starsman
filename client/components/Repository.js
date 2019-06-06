import React from "react";

const Repository = ({ repository }) => {
  const { nameWithOwner, url, description } = repository;
  return (
    <div className="p-2 border-bottom">
      <div>
        <h3 className="h4">
          <a href={url}>{nameWithOwner}</a>
        </h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Repository;
