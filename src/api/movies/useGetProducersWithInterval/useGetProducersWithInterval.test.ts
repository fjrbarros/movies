import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { createQueryClient, createWrapper, mockFetch } from "@utils";
import { useGetProducersWithInterval } from "./useGetProducersWithInterval";

describe("useGetProducersWithInterval", () => {
  let queryClient: QueryClient;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    queryClient = createQueryClient();
    wrapper = createWrapper(queryClient);
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches and returns the data correctly", async () => {
    const MOCK_INTERVAL_PRODUCERS = {
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };

    mockFetch({ response: MOCK_INTERVAL_PRODUCERS });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetProducersWithInterval(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(MOCK_INTERVAL_PRODUCERS);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return an empty array if the response is not defined", async () => {
    mockFetch({});

    const { result, waitForNextUpdate } = renderHook(
      () => useGetProducersWithInterval(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ min: [], max: [] });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return error if the response is not ok", async () => {
    mockFetch({ status: 400, ok: false });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetProducersWithInterval(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ min: [], max: [] });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
