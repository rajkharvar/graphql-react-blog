import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Users from "../components/Users";
import Loading from "../components/Loading";
import { FETCH_USERS } from "../graphql/queries/fetchUsers";

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
