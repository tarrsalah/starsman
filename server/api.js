import github from "./github.js";

function checkUser(request, h) {
  let profile = request.auth.credentials.profile;
  let user = {
    id: profile.id,
    username: profile.username,
    avatar_url: profile.raw.avatar_url
  };

  return user;
}

async function getStars(request, h) {
  const token = request.auth.credentials.token;
  const repos = await github.getStarredRepos(token, 10);
  return h.response(repos);
}

async function sync(request, h) {
  const token = request.auth.credentials.token;
  const repos = await github.getStarredRepos(token, 10);
  return h.response(repos);
}

const options = {
  auth: {
    strategy: "session",
    mode: "required"
  }
};

const api = {
  name: "api",
  register: function(server, options) {
    server.route([
      {
        path: "/api/user",
        method: "GET",
        handler: checkUser,
        options: {
          auth: {
            strategy: "session",
            mode: "required"
          }
        }
      },
      {
        path: "/api/starred",
        method: "GET",
        handler: getStars,
        options: {
          auth: {
            strategy: "session",
            mode: "required"
          }
        }
      },
      {
        path: "/api/sync",
        method: "GET",
        handler: getStars,
        options: {
          auth: {
            strategy: "session",
            mode: "required"
          }
        }
      }
    ]);
  }
};

export default api;
