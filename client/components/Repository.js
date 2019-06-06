import React from "react";

const Repository = ({ repository }) => {
  const { nameWithOwner, url, description } = repository;
  return (
    <div className="pt-2 pb-4  border-bottom">
      <div>
        <h3 className="h5">
          <a href={url}>{nameWithOwner}</a>
        </h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Repository;
