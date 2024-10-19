import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BaseCard } from "./BaseCard";

describe("BaseCard Component", () => {
  it("should render BaseCard with Title", () => {
    render(
      <BaseCard>
        <BaseCard.Title label="Test Title" />
      </BaseCard>,
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render BaseCard with SubTitle", () => {
    render(
      <BaseCard>
        <BaseCard.SubTitle label="Test SubTitle" />
      </BaseCard>,
    );
    expect(screen.getByText("Test SubTitle")).toBeInTheDocument();
  });

  it("should render BaseCard with Input and handle search", () => {
    const handleSearch = jest.fn();
    render(
      <BaseCard>
        <BaseCard.Input label="Test Input" onSearch={handleSearch} />
      </BaseCard>,
    );

    const input = screen.getByLabelText("Test Input");
    const button = screen.getByRole("button", { name: "search button" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith("test");
  });

  it("should clear input value when clear button is clicked", () => {
    const handleSearch = jest.fn();
    render(
      <BaseCard>
        <BaseCard.Input label="Test Input" onSearch={handleSearch} />
      </BaseCard>,
    );

    const input = screen.getByLabelText("Test Input");
    const clearButton = screen.getByLabelText("clear value");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(handleSearch).toHaveBeenCalledWith("");
  });

  it("should disable search button when isLoading is true", () => {
    render(
      <BaseCard>
        <BaseCard.Input label="Test Input" isLoading={true} />
      </BaseCard>,
    );

    const button = screen.getByRole("button", { name: "search button" });
    expect(button).toBeDisabled();
  });
});
