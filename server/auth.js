import hapiCookie from "@hapi/cookie";
import hapiBell from "@hapi/bell";
import { storeUser } from "./db.js";

const auth = {
  name: "auth",
  register: async function(server, options) {
    await server.register(hapiCookie);
    await server.register(hapiBell);
    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "sid",
        password: "GQT0QEMI0QKFH0KN48QABSSIHON8H6RP",
        isSecure: false,
        path: "/",
        isSameSite: "Lax"
      },
      redirectTo: false
    });

    server.auth.strategy("github", "bell", {
      provider: "github",
      password: "PEBKD2M2FJCFVQU6NJ7D0UDAN78QUTNH",
      clientId: "d77f5587dd83204b7f1f",
      clientSecret: "1578f98d970e4c4c49f380679a70b8b3a38c5f04",
      isSecure: false
    });

    server.route({
      method: ["GET"],
      path: "/auth/github",
      options: {
        handler: async (request, h) => {
          return h.redirect("/auth/github/callback");
        }
      }
    });

    server.route({
      method: ["GET", "POST"],
      path: "/auth/github/callback",
      options: {
        auth: "github",
        handler: async (request, h) => {
          let credentials = request.auth.credentials;
          let db = request.server.app.db;

          await storeUser(db, {
            username: credentials.profile.username,
            github_id: credentials.profile.id
          });

          request.cookieAuth.set(credentials);
          return h.redirect("/");
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
  }
};

export default auth;
