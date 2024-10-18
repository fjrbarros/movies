import { fireEvent, render, screen } from "@testing-library/react";
import type { ITableColumn } from "@types";
import { Table } from "./Table";

interface Data {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const columns: ITableColumn[] = [
  {
    id: "name",
    label: "Dessert (100g serving)",
    filter: { placeholder: "Filter by name" },
    sx: { minWidth: 150 },
  },
  {
    id: "calories",
    label: "Calories",
    headerTextAlign: "right",
    bodyTextAlign: "right",
    filter: { placeholder: "Filter by calories" },
    sx: { minWidth: 100 },
  },
  {
    id: "fat",
    label: "Fat (g)",
    headerTextAlign: "right",
    bodyTextAlign: "right",
    sx: { minWidth: 80 },
  },
  {
    id: "carbs",
    label: "Carbs (g)",
    headerTextAlign: "right",
    bodyTextAlign: "right",
    filter: { placeholder: "Filter by carbs" },
    sx: { minWidth: 80 },
  },
  {
    id: "protein",
    label: "Protein (g)",
    headerTextAlign: "right",
    bodyTextAlign: "right",
    sx: { minWidth: 80 },
  },
];

const data: Data[] = [
  { name: "Frozen yoghurt", calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  { name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
];

describe("Table Component", () => {
  it("should renders table headers correctly", () => {
    render(<Table columns={columns} data={data} onFilterChange={() => {}} />);

    for (const column of columns) {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    }
  });

  it("should renders table data correctly", () => {
    render(<Table columns={columns} data={data} onFilterChange={() => {}} />);

    for (const row of data) {
      for (const column of columns) {
        const cellValue = String(row[column.id as keyof Data]);
        const cells = screen.getAllByText(cellValue);

        const cell = cells.find((c) =>
          c.closest("tr")?.contains(screen.getByText(row.name)),
        );

        expect(cell).toBeInTheDocument();
      }
    }
  });

  it("should displays loading message when isLoading is true", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        onFilterChange={() => {}}
        isLoading={true}
        loadingMessage="Loading..."
      />,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should displays empty message when there is no data", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        onFilterChange={() => {}}
        isLoading={false}
        emptyMessage="No data"
      />,
    );

    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should calls onFilterChange when filter value changes", () => {
    const mockOnFilterChange = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const filterInput = screen.getByPlaceholderText("Filter by name");
    fireEvent.change(filterInput, { target: { value: "Ice" } });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "Ice" });
  });
});
