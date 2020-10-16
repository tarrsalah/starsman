import React, { Fragment, useState } from "react";

export default function Languages({ languages, toggleLanguage }) {
  function handleClick(name) {
    return function (e) {
      toggleLanguage(name);
    };
  }

  return (
    <div>
      <h3 className="font-bold text-2xl">📈 Filter by Language</h3>
      <ul className="max-w-xs">
        {Object.keys(languages).map((name) => {
          let language = languages[name];
          let selectedClass = language.selected ? "hover:bg-blue-500 bg-blue-500 text-white" : "";
          return (
            <li
              key={name}
              onClick={handleClick(name)}
              className={`p-2 mb-1 hover:bg-gray-100 ${selectedClass}`}
            >
              <span>{language.name}</span>
              <span className="float-right">{language.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
