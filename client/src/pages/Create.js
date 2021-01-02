import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { AuthContext } from "../context/auth";
import Loading from "../components/Loading";
import { CREATE_POST } from "../graphql/mutations/createPost";

export default function Create() {
  const { user } = useContext(AuthContext);
  const [postId, setPostId] = useState(null);

  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    createPost();
  };

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [createPost, { loading }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      setValues({
        title: "",
        description: "",
      });
      setPostId(result.data.createPost.id);
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  return (
    <div>
      <Title title="Create Post" />
      {loading && <Loading title="Creating Blog. Please wait ..." />}
      {!user ? (
        <h2>Please Sign In or Login To Create Post</h2>
      ) : (
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            name="title"
            label="Blog Title"
            placeholder="Enter Blog title"
            value={values.title}
            onChange={onChange}
            required
          />

          <Input
            type="textbox"
            name="description"
            label="Blog Description"
            placeholder="Enter Blog Description"
            value={values.description}
            onChange={onChange}
            required
          />
          <Button title="Create Post" type="submit" />
        </form>
      )}
      {postId && (
        <Link to={`/post/${postId}`}>
          Congratulations . Your Blog has been created. Check it Now
        </Link>
      )}
    </div>
  );
}
