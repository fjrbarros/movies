import { useGetStudiosWithWinners } from "@api";
import { render, screen } from "@testing-library/react";
import { StudiosCard } from "./StudiosCard";

jest.mock("@api", () => ({
  useGetStudiosWithWinners: jest.fn(),
}));

describe("StudiosCard", () => {
  it("should renders BaseCard.Title component with correct label", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<StudiosCard />);

    expect(screen.getByText("Top 3 studios with winners")).toBeInTheDocument();
  });

  it("should renders Table component with correct columns", () => {
    (useGetStudiosWithWinners as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });

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
      data: [],
      isLoading: true,
    });

    render(<StudiosCard />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
