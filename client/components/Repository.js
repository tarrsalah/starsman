import React from "react";

const Repository = ({ repository }) => {
  const { name, link, description } = repository;
  return (
    <div className="p-2 border-bottom">
      <div>
        <h3 className="h4">
          <a href={link}>{name}</a>
        </h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Repository;
