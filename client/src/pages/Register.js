import { useMutation } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Title from "../components/Title";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../graphql/mutations/registerUser";
import { FETCH_USERS } from "../graphql/queries/fetchUsers";

export default function Register() {
  const history = useHistory();
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result.data.register);
      context.login(result.data.register);
      history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
    refetchQueries: [
      {
        query: FETCH_USERS,
      },
    ],
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
    console.log("fired");
  };

  return (
    <div>
      <Title title="Register" />
      {loading && <Loading title="Registering User. Please wait ..." />}
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter your First Name"
          value={values.firstName}
          onChange={onChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter your Last Name"
          value={values.lastName}
          onChange={onChange}
          required
        />
        <Input
          type="number"
          name="phone"
          label="Phone Number"
          placeholder="Enter your Phone Number"
          value={values.phone}
          onChange={onChange}
          required
        />
        <Input
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          value={values.username}
          onChange={onChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={values.password}
          onChange={onChange}
          required
        />
        {/* <button type="submit">Register</button> */}
        <Button type="submit" title="Register" />
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
