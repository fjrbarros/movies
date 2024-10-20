import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import type { ITableColumn } from "@types";
import { Table } from "./Table";
import { InputFilter } from "./sub-components/InputFilters";

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
    filter: { placeholder: "Filter by name", triggerOnEnter: false },
  },
  {
    id: "calories",
    label: "Calories",
    filter: { placeholder: "Filter by calories", triggerOnEnter: true },
  },
  {
    id: "fat",
    label: "Fat (g)",
  },
  {
    id: "carbs",
    label: "Carbs (g)",
  },
  {
    id: "protein",
    label: "Protein (g)",
  },
];

const data = [
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
  it("should render table headers correctly", () => {
    render(<Table columns={columns} data={data} onFilterChange={() => {}} />);

    for (const column of columns) {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    }
  });

  it("should render table data correctly", () => {
    render(<Table columns={columns} data={data} onFilterChange={() => {}} />);

    for (const row of data) {
      for (const column of columns) {
        const cellValue = row[column.id as keyof Data];
        const cells = screen.getAllByText(cellValue);

        const cell = cells.find((c) =>
          c.closest("tr")?.contains(screen.getByText(row.name)),
        );

        expect(cell).toBeInTheDocument();
      }
    }
  });

  it("should display loading message when isLoading is true", () => {
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

  it("should display empty message when there is no data", () => {
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

  it("should call onFilterChange when filter value changes with debounce", async () => {
    const mockOnFilterChange = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const filterInput = screen.getByLabelText("Filter by name");
    fireEvent.change(filterInput, { target: { value: "Ice" } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "Ice" });
    });
  });

  it("should call onFilterChange when Enter is pressed", () => {
    const mockOnFilterChange = jest.fn();

    render(
      <Table
        columns={columns}
        data={data}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const filterInput = screen.getByLabelText("Filter by calories");
    fireEvent.change(filterInput, { target: { value: "calories" } });
    fireEvent.keyDown(filterInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ calories: "calories" });
  });

  it('should clear filter value when "clear" button is clicked', () => {
    const mockOnFilterChange = jest.fn();

    render(
      <Table
        columns={[columns[0]]}
        data={data}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const filterInput = screen.getByLabelText("Filter by name");
    fireEvent.change(filterInput, { target: { value: "Ice" } });

    const clearButton = screen.getByLabelText("clear value");
    fireEvent.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "" });
  });

  it("should call onFilterChange when select value changes", () => {
    const mockOnFilterChange = jest.fn();

    const selectColumns: ITableColumn[] = [
      {
        id: "category",
        label: "Category",
        filter: {
          placeholder: "Filter by category",
          type: "select",
          options: [
            { label: "Dessert", value: "dessert" },
            { label: "Snack", value: "snack" },
          ],
        },
      },
    ];

    render(
      <Table
        columns={selectColumns}
        data={data}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const selectInput = screen.getByLabelText("Filter by category");
    fireEvent.mouseDown(selectInput);
    const listbox = screen.getByRole("listbox");
    fireEvent.click(within(listbox).getByText("Dessert"));

    expect(mockOnFilterChange).toHaveBeenCalledWith({ category: "dessert" });
  });

  it("should not call onChange if Enter is not pressed when triggerOnEnter is true", () => {
    const mockOnChange = jest.fn();
    render(
      <InputFilter
        value="test"
        onChange={mockOnChange}
        label="Test Label"
        triggerOnEnter={true}
      />,
    );

    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "new value" } });
    fireEvent.keyDown(input, {
      key: "a",
      code: "KeyA",
      charCode: 65,
    });

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
