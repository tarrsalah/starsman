import React from "react";
import { Badge } from "reactstrap";

function Tag({ tag }) {
  const { text, name, count } = tag;

  return <span className="tag">{text + "/" + count}</span>;
}

export default Tag;
