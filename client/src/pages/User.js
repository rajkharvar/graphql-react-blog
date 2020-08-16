import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Loading from "../components/Loading";
import UserInfo from "../components/UserInfo";
import Posts from "../components/Posts";

export default function User() {
  const { username } = useParams();

  const { loading: loadingUser, data: userInfo } = useQuery(FETCH_USER, {
    variables: {
      username,
    },
  });

  const { loading: loadingPosts, data: posts } = useQuery(FETCH_POSTS, {
    variables: {
      username,
    },
  });

  return (
    <div>
      {loadingUser ? (
        <Loading title="Fetching User Details. Please wait ..." />
      ) : (
        userInfo && <UserInfo userInfo={userInfo.user} />
      )}
      {loadingPosts ? (
        <Loading title="Loading user posts. Please wait ..." />
      ) : (
        posts && <Posts posts={posts.getUserPost} />
      )}
    </div>
  );
}

const FETCH_USER = gql`
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

const FETCH_POSTS = gql`
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
