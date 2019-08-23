import React from "react";
import { Badge } from "reactstrap";

function Language({ language }) {
  const { name, count } = language;
  return (
    <li className="language">
      <span> {name}</span>
      <span class="badge badge-light"> ({count})</span>
    </li>
  );
}

export default Language;
