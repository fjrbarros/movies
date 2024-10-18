import { render, screen } from "@testing-library/react";
import { PageLoading } from "./PageLoading";

describe("PageLoading", () => {
  it("should render the PageLoading component", () => {
    render(<PageLoading />);
    expect(screen.getByTestId("content-loading")).toBeInTheDocument();
  });

  it("should render 9 Cube components", () => {
    render(<PageLoading />);
    const cubes = screen.getAllByTestId("cube");
    expect(cubes).toHaveLength(9);
  });

  it("should apply correct animation delays to each Cube", () => {
    render(<PageLoading />);
    const cubes = screen.getAllByTestId("cube");
    const animationDelays = [
      "0.2s",
      "0.3s",
      "0.4s",
      "0.1s",
      "0.2s",
      "0.3s",
      "0s",
      "0.1s",
      "0.2s",
    ];

    cubes.forEach((cube, index) => {
      expect(cube).toHaveStyle(`animation-delay: ${animationDelays[index]}`);
    });
  });
});
