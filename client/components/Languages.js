import React, { Fragment } from "react";
import { Spinner } from "reactstrap";
import Language from "./Language.js";

function Languages({ languages, loading }) {
  return (
    <Fragment>
      <h2 className="h5 font-weight-bolder mb-3">
        <span className="mr-2">📈 Languages</span>
        {loading && (
          <Spinner
            color="secondary"
            style={{ width: "1.5em", height: "1.5em" }}
          />
        )}
      </h2>
      <ul>
        {languages.map(language => (
          <Language key={language.name} language={language} />
        ))}
      </ul>
    </Fragment>
  );
}

export default Languages;
