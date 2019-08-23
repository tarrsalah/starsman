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

  // is the user has a cached starred repositories
  const cached = cache.get(userId);
  if (cached) {
    return h.response(cached);
  }

  // hit the github API
  const token = request.auth.credentials.token;
  let repos = [];

  let hasNextPage = true;
  let endCursor;

  while (hasNextPage) {
    let starredRepos = await github.getStarredRepos(token, 100, endCursor);

    hasNextPage = starredRepos.pageInfo.hasNextPage;
    endCursor = starredRepos.pageInfo.endCursor;

    repos = repos.concat(starredRepos.repos);
  }

  // cache the result
  cache.put(userId, repos, 1000 * 60 * 10);

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
