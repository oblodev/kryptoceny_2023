import { request, gql } from "graphql-request";

const graphqlAPI =
  "https://api-eu-central-1.hygraph.com/v2/cl76l80og092e01ukc84h18n2/master";

export const getFeaturedPost = async () => {
  const query = gql`
    query MyQuery {
      featuredPostsConnection(first: 500) {
        edges {
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
            category
            excerpt
            featuredImage {
              url
            }
            content {
              text
            }
          }
          cursor
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.featuredPostsConnection.edges;
};

export const getFeaturedPostDetails = async (slug) => {
  const query = gql`
    query getFeaturedPostDetails($slug: String!) {
      featuredPost(where: { slug: $slug }) {
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
        category
        title
        excerpt
        date
        featuredImage {
          url
        }
        content {
          raw
        }
        id
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.featuredPost;
};
