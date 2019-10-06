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

// get the current user's starred repositories
async function getStars(request, h) {
  const cache = request.server.app.cache;
  const userId = request.auth.credentials.profile.id;
  const next = request.query.next;

  // hit the github API
  const token = request.auth.credentials.token;

  let starredRepos = await github.getStarredRepos(token, 100, next);

  let hasNextPage = starredRepos.pageInfo.hasNextPage;
  let endCursor = starredRepos.pageInfo.endCursor;
  let repos = starredRepos.repos;

  let response = {
    repos,
    hasNextPage,
    endCursor
  };

  return h.response(response);
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
      }
    ]);
  }
};

export default api;
