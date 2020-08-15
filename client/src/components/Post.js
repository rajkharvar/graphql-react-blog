import React from "react";
import { Clock } from "react-feather";
import Avatar from "react-avatar";
import moment from "moment";
import { Link } from "react-router-dom";

import "./Post.scss";

export default function Post({ post }) {
  const { title, description, createdAt, username, id } = post;
  return (
    <div className="post-comp" key={id}>
      <h1>{title}</h1>
      <h3>{description}</h3>
      <Link to={`/user/${username}`}>
        <div className="icon">
          <Avatar name={username} round={true} size={28} textSizeRatio={1.5} />
          <p>{username}</p>
        </div>
      </Link>
      <div className="icon">
        <Clock />
        <p className="light">
          {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
        </p>
      </div>
    </div>
  );
}
