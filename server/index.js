import path from "path";
import Hapi from "@hapi/hapi";

import db from "./db.js";
import auth from "./auth.js";
import api from "./api";

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
