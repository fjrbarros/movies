import { homePageName } from "@constants";
import { screen } from "@testing-library/react";
import { customRenderRTL } from "@utils";
import { Home } from "./Home";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(() => jest.fn()),
  useLocation: jest.fn(() => ({ pathname: "/" })),
}));

describe("Home", () => {
  it("should renders PageWrapper with correct pageTitle", () => {
    renderComponent();

    expect(screen.getAllByText(homePageName)).toHaveLength(2);
  });

  it("should renders MultipleWinnersCard component", () => {
    renderComponent();

    const multipleWinnersCard = screen.getByText(
      "List years with multiple winners",
    );
    expect(multipleWinnersCard).toBeInTheDocument();
  });

  it("should renders StudiosCard component", () => {
    renderComponent();

    const studiosCard = screen.getByText("Top 3 studios with winners");
    expect(studiosCard).toBeInTheDocument();
  });

  it("should renders ProducersWithIntervalCard component", () => {
    renderComponent();

    const producersWithIntervalCard = screen.getByText(
      "Producers with longest and shortest interval between wins",
    );
    expect(producersWithIntervalCard).toBeInTheDocument();
  });

  it("should renders MovieWinnersCard component", () => {
    renderComponent();

    const movieWinnersCard = screen.getByText("List movie winners by year");
    expect(movieWinnersCard).toBeInTheDocument();
  });
});

const renderComponent = () => customRenderRTL(<Home />);
