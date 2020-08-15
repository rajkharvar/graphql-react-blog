import React from "react";
import Avatar from "react-avatar";
import moment from "moment";
import gql from "graphql-tag";

import Title from "./Title";
import "./Commets.scss";

export default function Comments({ comments }) {
  return (
    <div className="comments">
      <Title title="Comments" />
      {!comments.length && <h3>No Comments</h3>}
      <div>
        {comments.map(({ id, username, text, createdAt }) => (
          <div className="comment" key={id}>
            <Avatar
              name={username}
              round={true}
              textSizeRatio={1.5}
              size={30}
            />
            <div className="text-body">
              <span className="comment-text">{text}</span>
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $text: String!) {
    createComment(postId: $postId, text: $text) {
      id
      description
      createdAt
      comments {
        text
        id
        username
      }
      commentCount
    }
  }
`;
