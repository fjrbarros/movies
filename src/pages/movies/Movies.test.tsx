import { useGetListMovies } from "@api";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_LOADING_MESSAGE } from "@constants";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { customRenderRTL } from "@utils";
import { Movies } from "./Movies";

jest.mock("@api", () => ({
  useGetListMovies: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => jest.fn()),
  useLocation: jest.fn(() => ({ pathname: "/" })),
}));

const mockUseGetListMovies = useGetListMovies as jest.MockedFunction<
  typeof useGetListMovies
>;

const defaultResponse = {
  data: { content: [] },
  isLoading: false,
  isError: false,
};

describe("Movies", () => {
  beforeEach(() => {
    mockUseGetListMovies.mockClear();
  });

  it("should render the page title", () => {
    mockUseGetListMovies.mockReturnValue(defaultResponse);

    customRenderRTL(<Movies />);

    expect(screen.getByText("List movies")).toBeInTheDocument();
  });

  it("should render table headers correctly", () => {
    mockUseGetListMovies.mockReturnValue(defaultResponse);

    customRenderRTL(<Movies />);

    const headers = ["Id", "Year", "Title", "Winner"];
    for (const header of headers) {
      expect(screen.getByText(header)).toBeInTheDocument();
    }
  });

  it("should display loading state when data is loading", () => {
    mockUseGetListMovies.mockReturnValue({
      ...defaultResponse,
      isLoading: true,
    });

    customRenderRTL(<Movies />);

    expect(screen.getByText(DEFAULT_LOADING_MESSAGE)).toBeInTheDocument();
  });

  it("should display error state when data is failed to load", () => {
    mockUseGetListMovies.mockReturnValue({
      ...defaultResponse,
      isError: true,
    });

    customRenderRTL(<Movies />);

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it("should display data in the table", () => {
    const mockData = {
      content: [
        {
          id: 1,
          year: 2020,
          title: "Movie 1",
          winner: "Yes",
          studios: ["Studio 1"],
          producers: ["Producer 1"],
        },
        {
          id: 2,
          year: 2021,
          title: "Movie 2",
          winner: "No",
          studios: ["Studio 2"],
          producers: ["Producer 2"],
        },
      ],
    };

    mockUseGetListMovies.mockReturnValue({
      ...defaultResponse,
      data: mockData,
    });

    customRenderRTL(<Movies />);

    for (const movie of mockData.content) {
      expect(screen.getByText(movie.id)).toBeInTheDocument();
      expect(screen.getByText(movie.year)).toBeInTheDocument();
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      expect(screen.getByText(movie.winner)).toBeInTheDocument();
    }
  });

  it("should call onFilterChange when filter value changes", async () => {
    const mockData = {
      content: [
        {
          id: 1,
          year: 2020,
          title: "Movie 1",
          winner: "true",
          studios: ["Studio 1"],
          producers: ["Producer 1"],
        },
        {
          id: 2,
          year: 2021,
          title: "Movie 2",
          winner: "false",
          studios: ["Studio 2"],
          producers: ["Producer 2"],
        },
      ],
    };

    mockUseGetListMovies.mockReturnValue({
      ...defaultResponse,
      data: mockData,
    });

    customRenderRTL(<Movies />);

    const yearFilterInput = screen.getByLabelText("Filter by year");
    fireEvent.change(yearFilterInput, { target: { value: "2021" } });
    fireEvent.keyPress(yearFilterInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    await waitFor(() => {
      expect(mockUseGetListMovies).toHaveBeenCalledWith(
        expect.objectContaining({ page: 0, size: 999, winner: "", year: "" }),
      );
    });

    const winnerFilterSelect = screen.getByLabelText("Yes/No");
    fireEvent.mouseDown(winnerFilterSelect);
    const listbox = screen.getByRole("listbox");
    fireEvent.click(within(listbox).getByText("Yes"));

    await waitFor(() => {
      expect(mockUseGetListMovies).toHaveBeenCalledWith(
        expect.objectContaining({ winner: "true" }),
      );
    });
  });
});
