import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation createPost($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      id
      createdAt
      title
      description
      username
      likeCount
      commentCount
    }
  }
`;
