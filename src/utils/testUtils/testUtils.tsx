import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { ThemeProvider } from "../../providers/themeProvider/ThemeProvider";

interface IMockFetch {
  response?: Record<string, unknown>;
  ok?: boolean;
  status?: number;
}

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
};

export const createWrapper = (client: QueryClient) => {
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

const queryClientRTL = createQueryClient();

const combinedWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClientRTL}>
    <ThemeProvider>{children}</ThemeProvider>
  </QueryClientProvider>
);

export const customRenderRTL = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: combinedWrapper, ...options });

export const mockFetch = ({
  response = {},
  ok = true,
  status = 200,
}: IMockFetch) => {
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
      ok,
      status,
    } as Response),
  );
};
