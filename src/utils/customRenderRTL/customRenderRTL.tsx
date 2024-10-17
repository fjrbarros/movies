import { type RenderOptions, render } from "@testing-library/react";
import type { PropsWithChildren, ReactElement } from "react";
import { ThemeProvider } from "../../providers/themeProvider/ThemeProvider";

export const wrapper = ({ children }: PropsWithChildren) => (
  <ThemeProvider>{children}</ThemeProvider>
);

export const customRenderRTL = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">,
) => render(ui, { wrapper, ...options });
