import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Loading from "../components/Loading";
import UserInfo from "../components/UserInfo";
import Posts from "../components/Posts";
import { FETCH_POSTS } from "../graphql/queries/fetchPosts";
import { FETCH_USER } from "../graphql/queries/fetchUser";

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
      {(loadingUser || loadingPosts) && (
        <Loading title="Fetching Details. Please wait ..." />
      )}
      {userInfo && <UserInfo userInfo={userInfo.user} />}
      {posts && <Posts posts={posts.getUserPost} />}
    </div>
  );
}
