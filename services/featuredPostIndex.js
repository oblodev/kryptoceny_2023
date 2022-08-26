import { request, gql } from "graphql-request";

const graphqlAPI =
  "https://api-eu-central-1.hygraph.com/v2/cl76l80og092e01ukc84h18n2/master";

export const getFeaturedPost = async () => {
  const query = gql`
    query MyQuery {
      featuredPostsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.featuredPostsConnection.edges;
};
