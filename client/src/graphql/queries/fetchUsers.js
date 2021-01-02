import gql from "graphql-tag";

export const FETCH_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      username
      createdAt
      phone
    }
  }
`;
