import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { useAuth } from "../auth.js";

function Profile({ user }) {
  return (
    <a className="pull-right" href="/logout">
      Logout
    </a>
  );
}

export default function Header() {
  const user = useAuth();
  return (
    <header className="font-mono font-bold max-w-6xl  mx-auto mb-4 border-b border-gray-100">
      <nav className="relative flex flex-wrap items-center justify-between py-3 navbar-expand-lg">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap"
              href="/"
            >
              ✨ Starsman
            </a>
          </div>
          <div
            className="lg:flex flex-grow items-center"
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              <li className="nav-item">
                <Profile user={user} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
