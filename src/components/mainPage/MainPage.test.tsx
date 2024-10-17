import { drawerWidth } from "@constants";
import { screen } from "@testing-library/react";
import { customRenderRTL } from "@utils";
import { MainPage } from "./MainPage";

describe("MainPage", () => {
  it("should renders correctly with required props", () => {
    const { container } = renderComponent();

    expect(screen.getByText("Test Child")).toBeInTheDocument();
    expect(container.firstChild).not.toHaveStyle(
      `margin-left: ${drawerWidth}px`,
    );
  });

  it("passes openDrawer prop correctly", () => {
    const { container } = renderComponent({ openDrawer: true });
    expect(container.firstChild).toHaveStyle(`margin-left: ${drawerWidth}px`);
  });

  it("renders children correctly", () => {
    renderComponent({ children: <div>Another Child</div> });
    expect(screen.getByText("Another Child")).toBeInTheDocument();
  });
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    openDrawer: false,
    children: <div>Test Child</div>,
    ...props,
  };

  return customRenderRTL(<MainPage {...defaultProps} />);
};
