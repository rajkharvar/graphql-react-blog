import gql from "graphql-tag";

export const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      title
      description
      username
      createdAt
      commentCount
      likeCount
      comments {
        id
        text
        username
        createdAt
      }
      likes {
        username
        id
      }
    }
  }
`;
