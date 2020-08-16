import React, { useContext, useState, useEffect } from "react";
import Avatar from "react-avatar";
import { useMutation } from "@apollo/react-hooks";
import { Heart } from "react-feather";
import gql from "graphql-tag";

import "./Likes.scss";
import { AuthContext } from "../context/auth";
import Alert from "./Alert";

export default function Likes({ likes, postId }) {
  const [likesData, setLikesData] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const isLiked = likesData.find(
        ({ username }) => username === user.username
      );
      if (isLiked) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [likesData, user]);

  const [createLike, { loading }] = useMutation(CREATE_LIKE, {
    update(_, result) {
      setLikesData(result.data.likePost.likes);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      postId,
    },
  });

  const likePost = () => {
    if (user) {
      createLike();
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  return (
    <div className="likes">
      <h1 style={{ textAlign: "center" }}>
        <Heart
          fill={liked ? "red" : "white"}
          color="red"
          style={{ cursor: "pointer" }}
          onClick={() => likePost()}
        />
        <span> {likesData.length}</span>
      </h1>
      {showAlert && <Alert title="Please Login or SignUp to Continue ..." />}
      {!likesData.length && <h3>No Likes</h3>}
      <div className="likes-container">
        {likesData.map(({ username, id }) => (
          <div key={id} className="like-username">
            <Avatar
              name={username}
              round={true}
              textSizeRatio={1.5}
              size={20}
            />
            <p>{username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const CREATE_LIKE = gql`
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
