import type { QueryClient } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react-hooks";
import { createQueryClient, createWrapper, mockFetch } from "@utils";
import { useGetListMovies } from "./useGetListMovies";

const defaultParams = {
  year: "2020",
  winner: "true",
  page: 1,
  size: 10,
};

const MOCK_LIST_MOVIES = {
  content: [
    {
      id: 1,
      year: 1980,
      title: "Can't Stop the Music",
      studios: ["Associated Film Distribution"],
      producers: ["Allan Carr"],
      winner: true,
    },
    {
      id: 2,
      year: 1980,
      title: "Cruising",
      studios: ["Lorimar Productions", "United Artists"],
      producers: ["Jerry Weintraub"],
      winner: false,
    },
    {
      id: 3,
      year: 1980,
      title: "The Formula",
      studios: ["MGM", "United Artists"],
      producers: ["Steve Shagan"],
      winner: false,
    },
  ],
};

describe("useGetListMovies", () => {
  let queryClient: QueryClient;
  let wrapper: ReturnType<typeof createWrapper>;

  beforeEach(() => {
    queryClient = createQueryClient();
    wrapper = createWrapper(queryClient);
    queryClient.clear();
    jest.clearAllMocks();
  });

  it("fetches and returns the data correctly", async () => {
    mockFetch({ response: MOCK_LIST_MOVIES });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetListMovies(defaultParams),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    const normalizedData = MOCK_LIST_MOVIES.content.map((item) => ({
      ...item,
      winner: item.winner ? "Yes" : "No",
    }));

    expect(result.current.data).toEqual({
      ...MOCK_LIST_MOVIES,
      content: normalizedData,
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return an empty array if the response is not defined", async () => {
    mockFetch({ response: [] });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetListMovies(defaultParams),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ content: [] });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it("should return error if the response is not ok", async () => {
    mockFetch({ status: 400, ok: false, response: undefined });

    const { result, waitForNextUpdate } = renderHook(
      () => useGetListMovies(defaultParams),
      {
        wrapper,
      },
    );

    await waitForNextUpdate();

    expect(result.current.data).toEqual({ content: [] });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
