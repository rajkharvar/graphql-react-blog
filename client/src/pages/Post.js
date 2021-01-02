import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import Title from "../components/Title";
import Loading from "../components/Loading";
import PostComp from "../components/Post";
import Comments from "../components/Comments";
import Likes from "../components/Likes";
import { FETCH_POST } from "../graphql/queries/fetchPost";

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
            <Likes likes={post.likes} postId={post.id} />
            <Comments comments={post.comments.reverse()} postId={post.id} />
          </>
        )
      )}
    </div>
  );
}
