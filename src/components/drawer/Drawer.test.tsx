import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { screen } from "@testing-library/react";
import type { IModule } from "@types";
import { customRenderRTL } from "@utils";
import { Drawer } from "./Drawer";

jest.mock("@mui/material/styles", () => ({
  ...jest.requireActual("@mui/material/styles"),
  useTheme: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

const mockModules: IModule[] = [
  {
    id: "1",
    title: "Module 1",
    icon: "Home",
    uri: "/module1",
    isSelected: false,
  },
  {
    id: "2",
    title: "Module 2",
    icon: "Settings",
    uri: "/module2",
    isSelected: true,
  },
];

const renderComponent = (props = {}) => {
  const defaultProps = {
    openDrawer: true,
    drawerItems: mockModules,
    ...props,
  };

  return customRenderRTL(<Drawer {...defaultProps} />);
};

describe("Drawer", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      breakpoints: { down: jest.fn() },
    });
    (useMediaQuery as jest.Mock).mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    renderComponent();
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
    expect(screen.getByText("Module 1")).toBeInTheDocument();
    expect(screen.getByText("Module 2")).toBeInTheDocument();
  });

  it("opens and closes drawer", () => {
    const handleCloseDrawer = jest.fn();
    renderComponent({ handleCloseDrawer });
    const closeButton = screen.getByRole("button", { name: "close drawer" });
    closeButton.click();
    expect(handleCloseDrawer).toHaveBeenCalled();
  });

  it("clicking on drawer item triggers callback", () => {
    const onClickDrawerItem = jest.fn();
    renderComponent({ onClickDrawerItem });
    const module1 = screen.getByText("Module 1");
    module1.click();
    expect(onClickDrawerItem).toHaveBeenCalledWith(mockModules[0]);
  });

  it("closes drawer on item click on smaller screens", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    const handleCloseDrawer = jest.fn();
    renderComponent({ handleCloseDrawer });
    const module1 = screen.getByText("Module 1");
    module1.click();
    expect(handleCloseDrawer).toHaveBeenCalled();
  });

  it("drawer variant changes based on screen size", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    renderComponent({ drawerItems: undefined });
    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });
});
