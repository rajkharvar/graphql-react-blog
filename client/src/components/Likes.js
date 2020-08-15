import React, { useContext } from "react";
import Avatar from "react-avatar";
import { Heart } from "react-feather";
import gql from "graphql-tag";

import "./Likes.scss";
import { AuthContext } from "../context/auth";

export default function Likes({ likes }) {
  const { user } = useContext(AuthContext);
  let liked = false;

  if (user) {
    const alreadyLiked = likes.find(
      ({ username }) => username === user.username
    );
    if (alreadyLiked) {
      liked = true;
    }
  }

  console.log(liked);

  return (
    <div className="likes">
      <h1 style={{ textAlign: "center" }}>
        <Heart fill={liked ? "red" : "white"} color="red" />
        {likes.length}
      </h1>
      {!likes.length && <h3>No Likes</h3>}
      {likes.map(({ username, id }) => (
        <div key={id}>
          <Avatar name={username} round={true} textSizeRatio={1.5} size={20} />
          <p>{username}</p>
        </div>
      ))}
    </div>
  );
}

const CREATE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      description
      likeCount
      likes {
        username
        createdAt
      }
    }
  }
`;
