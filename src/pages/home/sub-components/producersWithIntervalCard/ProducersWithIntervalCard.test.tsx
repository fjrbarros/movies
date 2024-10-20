import { useGetProducersWithInterval } from "@api";
import { render, screen } from "@testing-library/react";
import { ProducersWithIntervalCard } from "./ProducersWithIntervalCard";

jest.mock("@api", () => ({
  useGetProducersWithInterval: jest.fn(),
}));

const mockData = {
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

describe("ProducersWithIntervalCard", () => {
  it("should renders BaseCard.Title and BaseCard.SubTitle component with correct label", () => {
    (useGetProducersWithInterval as jest.Mock).mockReturnValue({
      data: { min: [], max: [] },
      isLoading: false,
    });

    render(<ProducersWithIntervalCard />);

    expect(
      screen.getByText(
        "Producers with longest and shortest interval between wins",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("Maximum")).toBeInTheDocument();
    expect(screen.getByText("Minimum")).toBeInTheDocument();
  });

  it("should renders Table component with correct columns", () => {
    (useGetProducersWithInterval as jest.Mock).mockReturnValue({
      data: { min: [], max: [] },
      isLoading: false,
    });

    render(<ProducersWithIntervalCard />);

    const columns = [
      {
        id: "producer",
        label: "Producer",
      },
      { id: "interval", label: "Interval" },
      {
        id: "previousWin",
        label: "Previous Year",
      },
      {
        id: "followingWin",
        label: "Following Year",
      },
    ];

    for (const column of columns) {
      expect(screen.getAllByText(column.label)).toHaveLength(2);
    }
  });

  it("should renders with correct data", () => {
    (useGetProducersWithInterval as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ProducersWithIntervalCard />);

    for (const data of mockData.max) {
      expect(screen.getByText(data.producer)).toBeInTheDocument();
      expect(screen.getByText(data.interval.toString())).toBeInTheDocument();
      expect(screen.getByText(data.previousWin.toString())).toBeInTheDocument();
      expect(
        screen.getByText(data.followingWin.toString()),
      ).toBeInTheDocument();
    }
  });

  it("should passes isLoading prop to Table component", () => {
    (useGetProducersWithInterval as jest.Mock).mockReturnValue({
      data: { min: [], max: [] },
      isLoading: true,
    });

    render(<ProducersWithIntervalCard />);

    expect(screen.queryAllByText("Loading data...")).toHaveLength(2);
  });
});
