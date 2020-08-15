import React from "react";

import Title from "./Title";
import PostCard from "./PostCard";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      <Title title="Posts" />
      {!posts.length && <h2>No Post by User</h2>}
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
}
