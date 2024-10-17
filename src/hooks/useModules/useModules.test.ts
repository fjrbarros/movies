import { homePath, moviesPath } from "@constants";
import { renderHook } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useModules } from "./useModules";

jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
}));

describe("useModules", () => {
  const mockedUseLocation = useLocation as jest.Mock;
  mockedUseLocation.mockReturnValue({ pathname: homePath });

  beforeEach(() => {
    mockedUseLocation.mockClear();
  });

  it("returns the correct number of modules", () => {
    const { result } = renderHook(() => useModules());
    expect(result.current.modules).toHaveLength(2);
  });

  it("correctly identifies the selected module based on pathname", () => {
    const paths = [homePath, moviesPath];

    for (const path of paths) {
      mockedUseLocation.mockReturnValue({ pathname: path });
      const { result } = renderHook(() => useModules());
      const selectedModule = result.current.modules.find(
        (module) => module.isSelected,
      );
      expect(selectedModule?.uri).toEqual(path);
    }
  });

  it("each module has expected properties", () => {
    const { result } = renderHook(() => useModules());
    for (const module of result.current.modules) {
      expect(module).toHaveProperty("id");
      expect(module).toHaveProperty("icon");
      expect(module).toHaveProperty("title");
      expect(module).toHaveProperty("uri");
      expect(module).toHaveProperty("isSelected");
    }
  });
});
