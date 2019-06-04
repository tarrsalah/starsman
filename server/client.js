require("isomorphic-fetch");
const API_URL = "https://api.github.com/graphql";

const starredReposQuery = `
query starred($perPage: Int!) {
  viewer {
    login
    name
    starredRepositories(first: $perPage, orderBy: {field: STARRED_AT, direction: DESC}) {
      edges {
        cursor
        node {
          id
          name
          primaryLanguage {
            id
            name
            color
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`;

function getStarredRepos(token, perPage) {
  return new Promise(async (resolve, reject) => {
    let variables = { perPage };
    let query = starredReposQuery;
    let options = {
      headers: {
        Authorization: "Bearer " + token
      },
      method: "POST",
      body: JSON.stringify({ query, variables })
    };

    try {
      let response = await fetch(API_URL, options);
      let data = await response.json();
      resolve(data);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

module.exports = { getStarredRepos };
