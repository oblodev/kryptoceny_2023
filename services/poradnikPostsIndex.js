import { request, gql } from "graphql-request";

const graphqlAPI =
  "https://api-eu-central-1.hygraph.com/v2/cl76l80og092e01ukc84h18n2/master";

export const getPoradnikPosts = async () => {
  // The only change is adding orderBy: date_DESC here
  const query = gql`
    query MyQuery {
      poradniksConnection(orderBy: date_DESC) {
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
            date
            poradnikImage {
              url
            }
            categories {
              name
              slug
            }
            content {
              raw
            }
            id
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.poradniksConnection.edges;
};


export const getPoradnikDetails = async (slug) => {
  const query = gql`
    query getPoradnikDetails($slug: String!) {
      poradnik(where: { slug: $slug }) {
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
        date
        poradnikImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
        id
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.poradnik;
};
