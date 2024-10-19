import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { createQueryClient, createWrapper, mockFetch } from "@utils";
import { useGetMultipleWinners } from "./useGetMultipleWinners";

describe("useGetMultipleWinners", () => {
  let queryClient: QueryClient;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    queryClient = createQueryClient();
    wrapper = createWrapper(queryClient);
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches and returns the data correctly", async () => {
    const MOCK_YEARS = {
      years: [
        { year: 2020, winnerCount: 2 },
        { year: 2021, winnerCount: 3 },
      ],
    };

    mockFetch({ response: MOCK_YEARS });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetMultipleWinners(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(MOCK_YEARS.years);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return an empty array if the response is not defined", async () => {
    mockFetch({});

    const { result, waitForNextUpdate } = renderHook(
      () => useGetMultipleWinners(),
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
      () => useGetMultipleWinners(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
