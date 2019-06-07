import React from "react";
import { Badge } from "reactstrap";
import tinycolor from "tinycolor2";

function Tag({ tag }) {
  const { text, color, name, count } = tag;

  const style = {
    backgroundColor: color,
    color: tinycolor(color).isDark() ? "white" : "black"
  };

  return (
    <span className="badge" style={style}>
      {text + "/" + count}
    </span>
  );
}

export default Tag;
