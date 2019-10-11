import fetch from "isomorphic-fetch";

async function getStarredRepos(token, perPage, afterCursor) {
  const API_URL = "https://api.github.com/graphql";
  afterCursor = afterCursor ? `after:"${afterCursor}"` : "after:null";
  const query = `query  {
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
  let options = {
    headers: {
      Authorization: "Bearer " + token
    },
    method: "POST",
    body: JSON.stringify({ query })
  };

  let response = await fetch(API_URL, options);
  return response.json();
}

export default { getStarredRepos };
