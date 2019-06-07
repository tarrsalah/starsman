import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import Tag from "./Tag.js";

function Tags({ tags, loading }) {
  return (
    <Fragment>
      <h2 className="h5 font-weight-bolder mb-3">
        <span className="mr-2">🔖 Tags</span>
        {loading && (
          <Spinner
            color="secondary"
            style={{ width: "1.5em", height: "1.5em" }}
          />
        )}
      </h2>
      <div>
        {tags.map(tag => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    </Fragment>
  );
}

export default Tags;
