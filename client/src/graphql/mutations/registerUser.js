import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phone: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        firstName: $firstName
        lastName: $lastName
        phone: $phone
      }
    ) {
      id
      username
      phone
      firstName
      lastName
      token
      createdAt
    }
  }
`;
