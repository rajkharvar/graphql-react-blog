import React from "react";
import { BookOpen, MessageCircle, Heart, Clock } from "react-feather";
import { Link } from "react-router-dom";
import moment from "moment";

import "./PostCard.scss";

export default function PostCard({ post }) {
  const { title, description, createdAt, likeCount, commentCount, id } = post;
  return (
    <Link to={`/post/${id}`}>
      <div className="post-card">
        <BookOpen size={100} />
        <div>
          <h1>{title}</h1>
          <h4>{description}</h4>
          <div className="row">
            <div className="icon">
              <Heart fill="red" color="red" />
              <p>{likeCount}</p>
            </div>
            <div className="icon">
              <MessageCircle fill="#3498DB" color="#3498DB" />
              <p>{commentCount}</p>
            </div>
          </div>
          <div className="icon">
            <Clock />
            <p className="light">
              {moment(createdAt).format("dddd, MMMM Do YYYY, h:mm a")}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
