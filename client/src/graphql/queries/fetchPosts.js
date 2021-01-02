import gql from "graphql-tag";

export const FETCH_POSTS = gql`
  query($username: String!) {
    getUserPost(username: $username) {
      id
      title
      createdAt
      description
      likeCount
      commentCount
    }
  }
`;
