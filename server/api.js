import github from "./github.js";

export default {
  name: "api",
  register: function(server) {
    let options = {
      auth: {
        strategy: "session",
        mode: "required"
      }
    };

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
          const key = request.auth.credentials.profile.id.toString();

          const next = request.query.next;
          const token = request.auth.credentials.token;

          return h.response(await github.getStarredRepos(token, 100, next));
        },
        options
      }
    ]);
  }
};
