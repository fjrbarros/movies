import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

const localStorageMock = (() => {
  let store: { [key in string]: string } = {};
  return {
    getItem(key: string | number) {
      return store[key] || null;
    },
    setItem(key: string | number, value: string | number) {
      store[key] = value.toString();
    },
    removeItem(key: string | number) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

beforeEach(() => {
  globalThis.localStorage = localStorageMock as Storage;
  localStorage.clear();
});

describe("useLocalStorage", () => {
  it("should use initialValue if localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue"),
    );

    expect(result.current[0]).toBe("defaultValue");
  });

  it("should get existing value from localStorage", () => {
    localStorage.setItem("testKey", JSON.stringify("storedValue"));
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue"),
    );

    expect(result.current[0]).toBe("storedValue");
  });

  it("should set new value in localStorage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("testKey", "defaultValue"),
    );

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify("newValue"));
  });

  it("should correctly handle a function updater", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", 0));

    act(() => {
      result.current[1]((prevValue) => prevValue + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify(1));

    act(() => {
      result.current[1]((prevValue) => prevValue + 10);
    });

    expect(result.current[0]).toBe(11);
    expect(localStorage.getItem("testKey")).toBe(JSON.stringify(11));
  });

  it("should update value when localStorage changes", () => {
    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => {
      localStorage.setItem("testKey", JSON.stringify("updated"));
      window.dispatchEvent(new Event("storage"));
    });

    expect(result.current[0]).toBe("updated");
  });
});
