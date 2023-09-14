import { MantineProvider } from "@mantine/core";
import { render, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../contexts/AuthProvider";
import { generateQueryClient } from "../lib/queryClient";

const generateTestQueryClient = () => {
  const client = generateQueryClient();
  const options = client.getDefaultOptions();
  options.queries = { ...options.queries, retry: false };
  return client;
};

// allow configuring context(s) when rendering components for a test
type ContextsProps = {
  queryClient?: QueryClient;
};

export const renderWithContexts = (ui: ReactElement, opts?: ContextsProps): RenderResult => {
  const queryClient = opts?.queryClient ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <AuthProvider>{ui}</AuthProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};
