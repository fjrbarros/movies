import { renderHook, waitFor } from "@testing-library/react";
import { queryClientWrapper } from "@utils";
import { ApiService } from "../../base";
import { useGetMultipleWinners } from "./useGetMultipleWinners";

jest.mock("../../base");

describe("useGetMultipleWinners", () => {
  let getMock: jest.SpyInstance;

  beforeEach(() => {
    getMock = jest
      .spyOn(ApiService.prototype, "get")
      .mockReturnValue(Promise.resolve([]));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the API with the correct parameters", async () => {
    const params = { projection: "years-with-multiple-winners" };
    const { result } = renderHook(() => useGetMultipleWinners(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => result.current.isLoading === false);

    expect(getMock).toHaveBeenCalledWith({ params });
  });

  it("should return an empty array when the API response is empty", async () => {
    const { result } = renderHook(() => useGetMultipleWinners(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return the correct data structure when the API call is successful", async () => {
    const mockData = [
      {
        years: [
          { year: 2021, winnerCount: 2 },
          { year: 2022, winnerCount: 3 },
        ],
      },
    ];

    getMock.mockReturnValue(Promise.resolve(mockData));

    const { result } = renderHook(() => useGetMultipleWinners(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => result.current.isLoading === false);

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });
});
