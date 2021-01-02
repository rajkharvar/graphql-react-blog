import gql from "graphql-tag";

export const CREATE_LIKE = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      description
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;
