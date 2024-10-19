import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { createQueryClient, createWrapper, mockFetch } from "@utils";
import { useGetMoviesWinners } from "./useGetMoviesWinners";

describe("useGetMoviesWinners", () => {
  let queryClient: QueryClient;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    queryClient = createQueryClient();
    wrapper = createWrapper(queryClient);
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches and returns the data correctly", async () => {
    const MOCK_WINNER_YEARS = [
      {
        id: 202,
        year: 2019,
        title: "Cats",
      },
      {
        id: 203,
        year: 2019,
        title: "Dogs",
      },
    ];

    mockFetch({ response: MOCK_WINNER_YEARS });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetMoviesWinners("2020"),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(MOCK_WINNER_YEARS);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return an empty array if the response is not defined", async () => {
    mockFetch({ response: [] });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetMoviesWinners("2020"),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return error if the response is not ok", async () => {
    mockFetch({ status: 400, ok: false });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetMoviesWinners("2020"),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
