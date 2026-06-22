import React from "react";

import { QueryClientProvider } from "react-query";

import queryClient from "../../utils/queryClient";

const QueryProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
