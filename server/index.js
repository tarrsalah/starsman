import path from "path";
import Hapi from "@hapi/hapi";
import client from "./client.js";
import sqlite from "sqlite";
import auth from "./auth.js";

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

  server.route({
    method: "GET",
    path: "/api/user",
    options: {
      auth: {
        strategy: "session",
        mode: "required"
      },
      handler: (request, h) => {
        let profile = request.auth.credentials.profile;
        let user = {
          id: profile.id,
          username: profile.username,
          avatar_url: profile.raw.avatar_url
        };

        return user;
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api/starred",
    options: {
      auth: {
        strategy: "session",
        mode: "required"
      }
    },
    handler: async (request, h) => {
      const token = request.auth.credentials.token;
      const repos = await client.getStarredRepos(token, 100);
      return h.response(repos);
    }
  });

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
