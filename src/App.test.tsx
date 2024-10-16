import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    render(<App />);
    expect(
      screen.getByText("Click on the Vite and React logos to learn more"),
    ).toBeInTheDocument();
  });
});
