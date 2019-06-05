require("isomorphic-fetch");
const API_URL = "https://api.github.com/graphql";

const starredReposQuery = `
query starred($perPage: Int!) {
  viewer {
    login
    name
    starredRepositories(first: $perPage, orderBy: {field: STARRED_AT, direction: DESC}) {
      edges {
        node {
          id
          nameWithOwner
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

function fromGraphqlResponse(responseJson) {
  let flat = responseJson["data"]["viewer"]["starredRepositories"];
  let repos = flat["edges"].map(repo => {
    return repo.node;
  });
  let pageInfo = flat["pageInfo"];

  return { repos, pageInfo };
}

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
      let responseJson = await response.json();

      resolve(fromGraphqlResponse(responseJson));
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

module.exports = { getStarredRepos };
