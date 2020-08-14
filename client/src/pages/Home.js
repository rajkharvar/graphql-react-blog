import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Users from "../components/Users";
import Loading from "../components/Loading";

export default function Home() {
  const { loading, data } = useQuery(FETCH_USERS);

  return (
    <div>
      {loading ? (
        <Loading title="Fetching users. Please wait..." />
      ) : (
        data && <Users users={data.users} />
      )}
    </div>
  );
}

const FETCH_USERS = gql`
  {
    users {
      id
      firstName
      lastName
      username
      createdAt
      phone
    }
  }
`;
