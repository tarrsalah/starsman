import fetch from "isomorphic-fetch";
const API_URL = "https://api.github.com/graphql";

function getQuery(perPage = 10, afterCursor) {
  afterCursor = afterCursor ? `after:"${afterCursor}"` : "after:null";
  return `query  {
            viewer {
    	    login
            name
            starredRepositories(first: ${perPage}, orderBy: {field: STARRED_AT, direction: DESC}, ${afterCursor}) {
              edges {
                node {
                  id
                  nameWithOwner
                  description
                  url
                  stargazers {
                    totalCount
                  }
                  forkCount
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
        }`;
}

function fromGraphqlResponse(responseJson) {
  let flat = responseJson["data"]["viewer"]["starredRepositories"];
  let repos = flat["edges"].map(repo => {
    return repo.node;
  });
  let pageInfo = flat["pageInfo"];

  return { repos, pageInfo };
}

function getStarredRepos(token, perPage, afterCursor) {
  return new Promise(async (resolve, reject) => {
    let query = getQuery(perPage, afterCursor);
    let options = {
      headers: {
        Authorization: "Bearer " + token
      },
      method: "POST",
      body: JSON.stringify({ query })
    };

    try {
      let response = await fetch(API_URL, options);
      let responseJson = await response.json();

      resolve(fromGraphqlResponse(responseJson));
    } catch (err) {
      reject(err);
    }
  });
}

export default { getStarredRepos };
