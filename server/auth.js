import hapiCookie from "@hapi/cookie";
import hapiBell from "@hapi/bell";
import dotenv from "dotenv";

import { storeUser } from "./db.js";

export default {
  name: "auth",
  register: async function(server, options) {
    await server.register(hapiCookie);
    await server.register(hapiBell);

    dotenv.config();
    server.auth.strategy("session", "cookie", {
      cookie: {
        name: "sid",
        password: process.env.COOKIE_SECRET,
        isSecure: false,
        path: "/",
        isSameSite: "Lax"
      },
      redirectTo: false
    });

    server.auth.strategy("github", "bell", {
      provider: "github",
      password: process.env.COOKIE_SECRET,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
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

          await storeUser({
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
