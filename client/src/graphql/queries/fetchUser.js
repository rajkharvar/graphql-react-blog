import gql from "graphql-tag";

export const FETCH_USER = gql`
  query($username: String!) {
    user(username: $username) {
      id
      firstName
      lastName
      username
      phone
      createdAt
    }
  }
`;
