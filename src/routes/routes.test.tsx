import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routersConfig } from "./routes";

describe("routers", () => {
  it("should render home page when router is /", async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getAllByText(/home/i)).toHaveLength(2);
    });
  });

  it("should render movies page when router is /movies", async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ["/movies"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getAllByText(/movies/i)).toHaveLength(3);
    });
  });

  it("should render not found page when route is not mapped", async () => {
    const router = createMemoryRouter(routersConfig, {
      initialEntries: ["/not-found"],
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });
});
