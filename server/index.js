const path = require("path");
const Hapi = require("@hapi/hapi");

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

  await server.register(require("@hapi/cookie"));
  await server.register(require("@hapi/bell"));
  await server.register(require("@hapi/inert"));

  server.auth.strategy("github", "bell", {
    provider: "github",
    password: "PEBKD2M2FJCFVQU6NJ7D0UDAN78QUTNH",
    clientId: "d77f5587dd83204b7f1f",
    clientSecret: "1578f98d970e4c4c49f380679a70b8b3a38c5f04",
    isSecure: process.env.NODE_ENV === "production"
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "starsman",
      password: "GQT0QEMI0QKFH0KN48QABSSIHON8H6RP",
      isSecure: process.env.NODE_ENV === "production"
    },
    redirectTo: "/"
  });

  server.route({
    method: "GET",
    path: "/login",
    options: {
      auth: "github",
      handler: (request, h) => {
        if (request.auth.isAuthenticated) {
          const user = request.auth.credentials.profile;
          const data = {
            name: user.displayName,
            username: user.username,
            avatar: user.raw.avatar_url
          };

          request.cookieAuth.set(data);
          return "auth succeeded";
        }

        return "auth error";
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api",
    handler: (request, h) => {
      return "Hello world!";
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
