import React from "react";
import { Badge } from "reactstrap";

function Tag({ tag }) {
  const { text, name } = tag;

  return <span className="tag">{text}</span>;
}

export default Tag;
