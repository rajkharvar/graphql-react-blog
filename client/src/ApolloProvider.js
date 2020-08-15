import React from "react";
import App from "./App";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "apollo-link-context";

import { AuthProvider } from "./context/auth";
const SOME_SECRET_TOKEN = "SOME_SECRET_TOKEN";

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SERVER_URL || "http://localhost:3001",
});

const authLinkHeaders = setContext(() => {
  const token = localStorage.getItem(SOME_SECRET_TOKEN);
  return {
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLinkHeaders.concat(httpLink),
  cache,
});

export default (
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>
);
