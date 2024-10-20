import { useGetMultipleWinners } from "@api";
import { DEFAULT_ERROR_MESSAGE } from "@constants";
import { render, screen } from "@testing-library/react";
import { MultipleWinnersCard } from "./MultipleWinnersCard";

jest.mock("@api", () => ({
  useGetMultipleWinners: jest.fn(),
}));

const defautResponse = { data: [], isLoading: false, isError: false };

describe("MultipleWinnersCard", () => {
  it("should renders BaseCard and BaseCard.Title correctly", () => {
    (useGetMultipleWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MultipleWinnersCard />);

    expect(
      screen.getByText("List years with multiple winners"),
    ).toBeInTheDocument();
  });

  it("should renders Table with correct columns", () => {
    (useGetMultipleWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<MultipleWinnersCard />);

    const columns = [
      { id: "year", label: "Year", sx: { width: "50%" } },
      { id: "winnerCount", label: "Win count", sx: { width: "50%" } },
    ];

    for (const column of columns) {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    }
  });

  it("should passes isLoading prop to Table", () => {
    (useGetMultipleWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isLoading: true,
    });

    render(<MultipleWinnersCard />);

    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("should passes data prop to Table", () => {
    const mockData = [
      { year: 2020, winnerCount: 2 },
      { year: 2021, winnerCount: 3 },
    ];
    (useGetMultipleWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      data: mockData,
    });

    render(<MultipleWinnersCard />);

    for (const row of mockData) {
      expect(screen.getByText(row.year.toString())).toBeInTheDocument();
      expect(screen.getByText(row.winnerCount.toString())).toBeInTheDocument();
    }
  });

  it("should passes isError prop to Table", () => {
    (useGetMultipleWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isError: true,
    });

    render(<MultipleWinnersCard />);

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });
});
