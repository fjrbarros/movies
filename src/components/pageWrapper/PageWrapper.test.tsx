import { homePageName, homePath } from "@constants";
import { useLocalStorage } from "@hooks";
import { fireEvent, screen } from "@testing-library/react";
import { customRenderRTL } from "@utils";
import { useNavigate } from "react-router-dom";
import { PageWrapper } from "./PageWrapper";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(() => ({ pathname: "/" })),
  useNavigate: jest.fn(() => jest.fn()),
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(() => [false, jest.fn()]),
}));

jest.mock("@hooks", () => ({
  useLocalStorage: jest.fn(),
  useModules: jest.fn(() => ({
    modules: [
      {
        id: "home-page",
        icon: "Home",
        title: "Home",
        uri: "/",
        isSelected: false,
      },
    ],
  })),
}));

const setDrawerOpen = jest.fn();

describe("PageWrapper", () => {
  beforeEach(() => {
    (useLocalStorage as jest.Mock).mockImplementationOnce(() => [
      false,
      setDrawerOpen,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should renders the children correctly", () => {
    renderComponent();

    expect(screen.getByText("children")).toBeInTheDocument();
  });

  it("should renders the page title correctly", () => {
    renderComponent();

    expect(screen.getByText("Page title")).toBeInTheDocument();
  });

  it("should navigates to the selected module when the drawer item is clicked", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    renderComponent();

    fireEvent.click(screen.getByText(homePageName));

    expect(navigate).toHaveBeenCalledWith(homePath);
  });

  it("should open drawer when the header button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "open drawer" }));

    expect(setDrawerOpen).toHaveBeenCalledWith(true);
  });
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    pageTitle: "Page title",
    ...props,
  };

  return customRenderRTL(
    <PageWrapper {...defaultProps}>
      <h1>children</h1>
    </PageWrapper>,
  );
};
