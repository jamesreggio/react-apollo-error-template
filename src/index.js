import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import { link } from "./graphql/link";
import App from "./App";

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
  debug: true,
});

const client = new ApolloClient({
  cache,
  link,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
