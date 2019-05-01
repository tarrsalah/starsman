const path = require("path");
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");

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
  await server.register(Inert);

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
