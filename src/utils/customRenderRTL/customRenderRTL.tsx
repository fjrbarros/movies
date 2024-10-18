import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { ThemeProvider } from "../../providers/themeProvider/ThemeProvider";

const queryClient = new QueryClient();

export const combinedWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>{children}</ThemeProvider>
  </QueryClientProvider>
);

export const customRenderRTL = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper: combinedWrapper, ...options });

export const queryClientWrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
