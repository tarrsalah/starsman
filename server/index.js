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

  await server.register(require("@hapi/inert"));
  await server.register(require("@hapi/cookie"));
  await server.register(require("@hapi/bell"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "sid",
      password: "GQT0QEMI0QKFH0KN48QABSSIHON8H6RP",
      isSecure: false,
      isSameSite: "Lax"
    },
    redirectTo: "/auth"
  });

  server.auth.strategy("github", "bell", {
    provider: "github",
    password: "PEBKD2M2FJCFVQU6NJ7D0UDAN78QUTNH",
    clientId: "d77f5587dd83204b7f1f",
    clientSecret: "1578f98d970e4c4c49f380679a70b8b3a38c5f04",
    isSecure: false
  });

  server.route({
    method: ["GET", "POST"],
    path: "/auth",
    options: {
      auth: "github",
      handler: async (request, h) => {
        request.cookieAuth.set(request.auth.credentials);
        return h.redirect("/");
      }
    }
  });

  server.route({
    method: ["GET"],
    path: "/login",
    options: {
      auth: {
        strategy: "session",
        mode: "required"
      },
      handler: async request => {
        return "login";
      }
    }
  });

  server.route({
    method: "GET",
    path: "/logout",
    options: {
      auth: {
        strategy: "session",
        mode: "try"
      },
      handler: (request, h) => {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.clear();
        }

        return h.redirect("/");
      }
    }
  });

  server.route({
    method: "GET",
    path: "/",
    options: {
      auth: {
        strategy: "session",
        mode: "optional"
      },
      handler: (request, h) => {
        return "index, authenticated " + request.auth.isAuthenticated;
      }
    }
  });

  server.route({
    method: "GET",
    path: "/api",
    options: {
      auth: {
        strategy: "session",
        mode: "optional"
      },
      handler: (request, h) => {
        console.log(request.auth.isAuthenticated);
        return "hello";
      }
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
