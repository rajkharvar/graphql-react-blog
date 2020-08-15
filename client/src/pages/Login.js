import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import gql from "graphql-tag";

import Title from "../components/Title";
import Input from "../components/Input";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import { AuthContext } from "../context/auth";
import "./Login.scss";
import Button from "../components/Button";

export default function Login() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      console.log(result);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="login">
      <Title title="LOGIN" />
      {loading && <Loading title="Logging In. Please wait ..." />}
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={values.username}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChange={onChange}
        />
        {/* <button type="submit">Login</button> */}
        <Button type="submit" title="Login" />
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="errors">
          {Object.values(errors).map((value) => (
            <Alert title={value} key={value} />
          ))}
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      phone
      firstName
      lastName
      token
      createdAt
    }
  }
`;
