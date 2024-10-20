import { fireEvent, render, screen } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("should renders the input with the correct label", () => {
    render(<SearchInput label="Search" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
  });

  it("should renders the input with the correct value", () => {
    render(
      <SearchInput label="Search" value="test value" onChange={() => {}} />,
    );

    expect(screen.getByDisplayValue("test value")).toBeInTheDocument();
  });

  it("should calls onChange when the input value changes", () => {
    const handleChange = jest.fn();

    render(<SearchInput label="Search" value="" onChange={handleChange} />);

    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "new value" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("should renders the clear button", () => {
    render(<SearchInput label="Search" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("clear value")).toBeInTheDocument();
  });

  it("should calls onCLickClear when the clear button is clicked", () => {
    const handleClear = jest.fn();
    render(
      <SearchInput
        label="Search"
        value="test value"
        onChange={() => {}}
        onCLickClear={handleClear}
      />,
    );

    fireEvent.click(screen.getByLabelText("clear value"));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
