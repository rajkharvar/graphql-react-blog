import { useMutation } from "@apollo/react-hooks";
import moment from "moment";
import React, { useContext, useState } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { CREATE_COMMENT } from "../graphql/mutations/createComment";
import Button from "./Button";
import "./Commets.scss";
// import { ArrowRight } from "react-feather";
import Input from "./Input";
import Title from "./Title";

export default function Comments({ comments, postId }) {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [commentsData, setCommentsData] = useState(comments);

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    update(_, result) {
      setCommentsData(result.data.createComment.comments.reverse());
      setText("");
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      postId,
      text,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  return (
    <div className="comments">
      <Title title="Comments" />
      {!commentsData.length && <h3>No Comments</h3>}
      <div>
        {commentsData.map(({ id, username, text, createdAt }) => (
          <div className="comment" key={id}>
            <Link to={`/user/${username}`}>
              <Avatar
                name={username}
                round={true}
                textSizeRatio={1.5}
                size={30}
              />
            </Link>
            <div className="text-body">
              <span className="comment-text">{text}</span>
              <p>{moment(createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <div className="comment-box">
            <Input
              type="text"
              placeholder={
                user
                  ? "Enter your Comment ..."
                  : "Please Login or SignUp to Continue ..."
              }
              style={{ borderRadius: "10px" }}
              onChange={(e) => setText(e.target.value)}
              disabled={!user ? true : false}
              value={text}
              required
            />
            {/* <ArrowRight color="#0A79DF" size={24} /> */}
            <Button
              type="submit"
              title="Create Comment"
              disabled={!user ? true : false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
