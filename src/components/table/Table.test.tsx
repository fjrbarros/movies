import {
  DEFAULT_EMPTY_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_LOADING_MESSAGE,
} from "@constants";
import {
  act,
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

describe("Table", () => {
  it("should render table headers correctly", () => {
    renderComponent();

    for (const column of columns) {
      expect(screen.getByText(column.label)).toBeInTheDocument();
    }
  });

  it("should render table data correctly", () => {
    renderComponent();

    for (const row of data) {
      for (const column of columns) {
        const cellValue = row[column.id as keyof Data];
        const cells = screen.getAllByText(String(cellValue));

        const cell = cells.find((c) =>
          c.closest("tr")?.contains(screen.getByText(row.name)),
        );

        expect(cell).toBeInTheDocument();
      }
    }
  });

  it("should display loading message when isLoading is true", () => {
    renderComponent({ isLoading: true });

    expect(screen.getByText(DEFAULT_LOADING_MESSAGE)).toBeInTheDocument();
  });

  it("should display empty message when there is no data", () => {
    renderComponent({ data: [] });

    expect(screen.getByText(DEFAULT_EMPTY_MESSAGE)).toBeInTheDocument();
  });

  it("should display error message when isError is true", () => {
    renderComponent({ isError: true });

    expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it("should call onFilterChange when filter value changes with debounce", async () => {
    const mockOnFilterChange = jest.fn();

    renderComponent({ onFilterChange: mockOnFilterChange });

    const filterInput = screen.getByLabelText("Filter by name");
    fireEvent.change(filterInput, { target: { value: "Ice" } });

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "Ice" });
    });
  });

  it("should call onFilterChange when Enter is pressed", () => {
    const mockOnFilterChange = jest.fn();

    renderComponent({ onFilterChange: mockOnFilterChange });

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

    renderComponent({
      columns: [columns[0]],
      onFilterChange: mockOnFilterChange,
    });

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

    renderComponent({
      columns: selectColumns,
      onFilterChange: mockOnFilterChange,
    });

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

  it("should call onPageChange when pagination is used", () => {
    const mockOnPageChange = jest.fn();

    renderComponent({
      onPageChange: mockOnPageChange,
      showPagination: true,
      page: 1,
      pageSize: 10,
      rowsPerPageList: [10, 20, 30],
    });

    fireEvent.click(screen.getByRole("button", { name: "Go to page 2" }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2, 10);
  });

  it("should call onPageChange when onRowsPerPageChange is called", () => {
    const mockOnPageChange = jest.fn();

    renderComponent({
      onPageChange: mockOnPageChange,
      showPagination: true,
      page: 1,
      pageSize: 10,
      rowsPerPageList: [10, 20, 30],
    });

    act(() => {
      fireEvent.mouseDown(screen.getByText("10"));
    });

    const selectInput = screen.getByRole("listbox");

    act(() => {
      fireEvent.click(within(selectInput).getByText("20"));
    });

    expect(mockOnPageChange).toHaveBeenCalled();
  });
});

const renderComponent = (props = {}) => {
  const defaultProps = {
    columns: columns,
    data: data,
    isLoading: false,
    isError: false,
    count: 100,
    showPagination: false,
    onFilterChange: () => {},
    ...props,
  };

  return render(<Table {...defaultProps} />);
};
