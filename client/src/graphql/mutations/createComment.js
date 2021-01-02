import gql from "graphql-tag";

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      id
      description
      createdAt
      comments {
        text
        id
        username
        createdAt
      }
      commentCount
    }
  }
`;
