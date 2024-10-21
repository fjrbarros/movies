import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { Pagination } from "./Pagination";

const defaultProps = {
  count: 100,
  page: 1,
  rowsPerPage: 10,
  rowsPerPageOptions: [10, 20, 30],
  onPageChange: jest.fn(),
  onRowsPerPageChange: jest.fn(),
};

describe("Pagination", () => {
  it("should render correctly with default props", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByText("Rows per page:")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Go to page 2" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should call onPageChange when a page is clicked", () => {
    render(<Pagination {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Go to page 2" }));

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onRowsPerPageChange when rows per page is changed", () => {
    render(<Pagination {...defaultProps} />);

    act(() => {
      fireEvent.mouseDown(screen.getByText("10"));
    });

    const selectInput = screen.getByRole("listbox");

    act(() => {
      fireEvent.click(within(selectInput).getByText("20"));
    });

    expect(defaultProps.onRowsPerPageChange).toHaveBeenCalledWith(20);
  });

  it("should display the correct number of pages", () => {
    render(<Pagination {...defaultProps} />);

    const totalPages = Math.ceil(defaultProps.count / defaultProps.rowsPerPage);

    expect(screen.getByText(totalPages.toString())).toBeInTheDocument();
  });
});
