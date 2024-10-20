import { fireEvent, render, screen, within } from "@testing-library/react";
import { act } from "react";
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
        onClickClear={handleClear}
      />,
    );

    fireEvent.click(screen.getByLabelText("clear value"));

    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("should renders the tooltip when tooltipText is passed", async () => {
    render(
      <SearchInput
        label="Search"
        value=""
        onChange={() => {}}
        tooltipText="Tooltip text"
      />,
    );

    const group = screen.getByRole("group", {
      hidden: true,
    });

    const infoIcon = within(group).getByTestId("InfoIcon");

    act(() => {
      fireEvent(
        infoIcon,
        new MouseEvent("mouseover", {
          bubbles: true,
        }),
      );
    });

    const tooltipText = await screen.findByText("Tooltip text");

    expect(tooltipText).toBeInTheDocument();
  });
});
