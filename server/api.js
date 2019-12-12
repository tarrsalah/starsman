import NodeCache from "node-cache";
import github from "./github.js";
import { promisify } from "util";

export default {
  name: "api",
  register: function(server) {
    let options = {
      auth: {
        strategy: "session",
        mode: "required"
      }
    };

    const cache = new NodeCache();

    server.route([
      {
        path: "/api/user",
        method: "GET",

        handler: async (request, h) => {
          let profile = request.auth.credentials.profile;

          let user = {
            id: profile.id,
            username: profile.username,
            avatar_url: profile.raw.avatar_url
          };

          return user;
        },
        options
      },

      {
        path: "/api/starred",
        method: "GET",
        handler: async (request, h) => {
          const userId = request.auth.credentials.profile.id;
          const next = request.query.next;
          const token = request.auth.credentials.token;
          const cached = cache.get(userId);

          let response = {};

          if (!cached) {
            response = await github.getStarredRepos(token, 100, next);
          } else {
            if (cached.hasNextPage === false) {
              return h.response(cached);
            } else {
              let fetched = await github.getStarredRepos(token, 100, next);
              response = {
                repos: [...cached.repos, ...fetched.repos].filter(
                  (obj, pos, arr) => {
                    return (
                      arr.map(mapObj => mapObj["id"]).indexOf(obj["id"]) === pos
                    );
                  }
                ),
                hasNextPage: fetched.hasNextPage,
                endCursor: fetched.endCursor
              };
            }
          }

          await cache.set(userId, response);
          return h.response(response);
        },
        options
      }
    ]);
  }
};
