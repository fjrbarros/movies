import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { createQueryClient, createWrapper, mockFetch } from "@utils";
import { useGetStudiosWithWinners } from "./useGetStudiosWithWinners";

describe("useGetStudiosWithWinners", () => {
  let queryClient: QueryClient;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    queryClient = createQueryClient();
    wrapper = createWrapper(queryClient);
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches and returns the data correctly", async () => {
    const MOCK_STUDIOS = {
      studios: [
        {
          name: "Columbia Pictures",
          winCount: 7,
        },
        {
          name: "Paramount Pictures",
          winCount: 6,
        },
      ],
    };

    mockFetch({ response: MOCK_STUDIOS });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetStudiosWithWinners(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual(MOCK_STUDIOS.studios);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return an empty array if the response is not defined", async () => {
    mockFetch({});

    const { result, waitForNextUpdate } = renderHook(
      () => useGetStudiosWithWinners(),
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
      () => useGetStudiosWithWinners(),
      { wrapper },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
