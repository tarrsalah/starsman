import path from "path";
import sqlite from "sqlite";
import Hapi from "@hapi/hapi";

import auth from "./auth.js";
import api from "./api";

const db = Promise.resolve()
  .then(() => sqlite.open("./database.sqlite", { Promise }))
  .then(db =>
    db.migrate({ force: "last", migrationsPath: "./server/migrations" })
  );

const start = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      files: {
        relativeTo: path.join(__dirname, "..", "public")
      }
    }
  });
  await server.register(require("@hapi/inert"));
  await server.register(auth);
  await server.register(api);

  server.route({
    method: "GET",
    path: "/{p*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: true
      }
    }
  });

  await server.start();
};

start();
