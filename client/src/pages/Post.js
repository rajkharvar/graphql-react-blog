import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Title from "../components/Title";
import Loading from "../components/Loading";
import PostComp from "../components/Post";
import Comments from "../components/Comments";
import Likes from "../components/Likes";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const { loading, data } = useQuery(FETCH_POST, {
    variables: {
      postId: id,
    },
  });

  useEffect(() => {
    if (data) {
      setPost(data.getPost);
    }
  }, [data]);

  return (
    <div>
      <Title title="Post" />
      {loading ? (
        <Loading title="Fetching post. Please wait ..." />
      ) : (
        post && (
          <>
            <PostComp post={post} />
            <Likes likes={post.likes} />
            <Comments comments={post.comments} />
          </>
        )
      )}
    </div>
  );
}

const FETCH_POST = gql`
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
