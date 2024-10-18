import { errorPage, homePath } from "@constants";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { NotFound } from "./NotFound";

jest.mock("react-router-dom");

describe("NotFound", () => {
  it("should renders correctly", () => {
    render(<NotFound />);

    expect(screen.getByText(errorPage.code)).toBeInTheDocument();
    expect(screen.getByText(errorPage.title)).toBeInTheDocument();
    expect(screen.getByText(errorPage.description)).toBeInTheDocument();
    expect(screen.getByText(errorPage.button)).toBeInTheDocument();
    expect(screen.getByAltText(errorPage.title)).toBeInTheDocument();
  });

  it("should navigate to home page when button is clicked", () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    render(<NotFound />);

    const button = screen.getByText(errorPage.button);

    button.click();

    expect(navigate).toHaveBeenCalledWith(homePath);
  });
});
