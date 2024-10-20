import { useGetStudiosWithWinners } from "@api";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_LOADING_MESSAGE } from "@constants";
import { render, screen } from "@testing-library/react";
import { StudiosCard } from "./StudiosCard";

jest.mock("@api", () => ({
  useGetStudiosWithWinners: jest.fn(),
}));

const defautResponse = { data: [], isLoading: false, isError: false };

describe("StudiosCard", () => {
  it("should renders BaseCard.Title component with correct label", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<StudiosCard />);

    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
  });

  it("should renders Table component with correct columns", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue(defautResponse);

    render(<StudiosCard />);

    const columns = [
      { id: "name", label: "Name" },
      { id: "winCount", label: "Win count" },
    ];

    for (const column of columns) {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    }
  });

  it("should passes isLoading prop to Table component", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isLoading: true,
    });

    render(<StudiosCard />);

    expect(screen.getByText(DEFAULT_LOADING_MESSAGE)).toBeInTheDocument();
  });

  it("should renders the studios data", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      data: [{ name: "Studio 1", winCount: 1 }],
    });

    render(<StudiosCard />);

    expect(screen.getByText("Studio 1")).toBeInTheDocument();
  });

  it("should renders error message when data is failed to load", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue({
      ...defautResponse,
      isError: true,
    });

    render(<StudiosCard />);

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });
});
