const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    username: String!
    phone: String!
    createdAt: String!
    token: String
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    createdAt: String!
    username: String!
    comments: [Comment!]
    commentCount: Int!
    likes: [Like!]
    likeCount: Int!
  }

  type Comment {
    id: ID!
    text: String!
    username: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    createdAt: String
    username: String!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUserPost(username: String!): [Post]
    users: [User]
    user(username: String): User
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    username: String!
    phone: String!
    password: String!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(title: String!, description: String!): Post
    createComment(postId: String!, text: String!): Post!
    likePost(postId: ID!): Post!
  }
`;
