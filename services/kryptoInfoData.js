import { request, gql } from "graphql-request";

const graphqlAPI =
  "https://api-eu-central-1.hygraph.com/v2/cl76l80og092e01ukc84h18n2/master";

export const getKryptowaluty = async () => {
  const query = gql`
    query MyQuery {
      kryptowalutiesConnection {
        edges {
          node {
            title
            slug
            kryptoImage {
              url
            }
            desc
            content {
              raw
            }
          }
          cursor
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.kryptowalutiesConnection.edges;
};

export const getKryptowalutyDetails = async (slug) => {
  const query = gql`
    query getKryptowalutyDetails($slug: String!) {
      kryptowaluty(where: { slug: $slug }) {
        content {
          raw
        }
        desc
        id
        slug
        title
        kryptoImage {
          url
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.kryptowaluty;
};
