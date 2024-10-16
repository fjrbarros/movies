import { useScrollTrigger } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { AppHeader } from "./AppHeader";

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useScrollTrigger: jest.fn(),
}));

describe("AppHeader", () => {
  beforeEach(() => {
    (useScrollTrigger as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should renders correctly with default props", () => {
    (useScrollTrigger as jest.Mock).mockReturnValue(true);
    renderComponent();

    expect(
      screen.getByRole("button", { name: /open drawer/i }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("should displays the correct title", () => {
    renderComponent({ title: "Custom Title" });

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("should calls handleOpenDrawer when drawer button is clicked", () => {
    const handleOpenDrawer = jest.fn();
    renderComponent({ handleOpenDrawer });

    fireEvent.click(screen.getByRole("button", { name: /open drawer/i }));
    expect(handleOpenDrawer).toHaveBeenCalled();
  });
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    openDrawer: false,
    handleOpenDrawer: jest.fn(),
    title: undefined,
    ...props,
  };

  return render(<AppHeader {...defaultProps} />);
};
