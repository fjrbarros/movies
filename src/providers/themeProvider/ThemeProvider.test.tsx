import { render, screen } from "@testing-library/react";
import React from "react";
import { ThemeProvider } from "./ThemeProvider";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("ThemeProvider", () => {
  it("should render children correctly", () => {
    render(
      <ThemeProvider>
        <div>ThemeProvider test</div>
      </ThemeProvider>,
    );

    expect(screen.getByText("ThemeProvider test")).toBeInTheDocument();
  });
});
