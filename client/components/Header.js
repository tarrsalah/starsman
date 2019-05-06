import React from "react";

export default () => {
  return (
    <nav
      className="navbar has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <strong className="is-size-5">✨ Starsman</strong>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-dark">
                  <strong> Log in</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
