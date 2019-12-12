import { request, GraphQLClient } from "graphql-request";

const query = `
query  getRepos($after: String){
  viewer {
    login
    name
    starredRepositories(first: 100, orderBy: {field: STARRED_AT, direction: DESC}, after: $after) {
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
      totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
      }
   }
}`;

export default async function(token, after) {
  const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      authorization: `Bearer ${token}`
    }
  });

  const response = await graphQLClient.request(query, { after });
  const starredRepos = response.viewer.starredRepositories;

  return {
    repos: starredRepos.edges.map(edge => {
      return edge.node;
    }),
    endCursor: starredRepos.pageInfo.endCursor,
    hasNextPage: starredRepos.pageInfo.hasNextPage
  };
}
