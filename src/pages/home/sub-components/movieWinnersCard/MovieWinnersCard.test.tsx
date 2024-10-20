import { useGetMoviesWinners } from "@api";
import {
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_LOADING_MESSAGE,
} from "@constants";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { MovieWinnersCard } from "./MovieWinnersCard";

jest.mock("@api", () => ({
  useGetMoviesWinners: jest.fn(),
}));

const defautResponse = { data: [], isLoading: false, isError: false };

describe("MovieWinnersCard", () => {
  it("should renders BaseCard component", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MovieWinnersCard />);

    expect(screen.getByText("List movie winners by year")).toBeInTheDocument();
  });

  it("should renders Table component with correct columns", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MovieWinnersCard />);

    expect(screen.getByText("Id")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("should sets year state on search input change", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MovieWinnersCard />);

    const input = screen.getByLabelText("Search by year");

    act(() => {
      fireEvent.change(input, { target: { value: "2021" } });
      const button = screen.getByRole("button", { name: "search button" });
      fireEvent.click(button);
    });

    expect(useGetMoviesWinners).toHaveBeenCalledWith("2021");
  });

  it("should displays loading state in Table component", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isLoading: true,
    });

    render(<MovieWinnersCard />);

    expect(screen.getByText(DEFAULT_LOADING_MESSAGE)).toBeInTheDocument();

    expect(screen.getAllByRole("progressbar")).toHaveLength(2);
  });

  it("should displays error state in Table component", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isError: true,
    });

    render(<MovieWinnersCard />);

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it("should displays empty state in Table component", () => {
    (useGetMoviesWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MovieWinnersCard />);

    expect(screen.getByText(DEFAULT_EMPTY_MESSAGE)).toBeInTheDocument();
  });

  it("should renders data in Table component", () => {
    const mockData = [
      { id: "1", year: "2021", title: "Movie 1" },
      { id: "2", year: "2020", title: "Movie 2" },
    ];

    (useGetMoviesWinners as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<MovieWinnersCard />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
