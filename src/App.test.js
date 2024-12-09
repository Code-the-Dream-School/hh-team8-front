import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
//import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App Component", () => {
  test("renders the message from the API", async () => {
    render(<App />);

    // Wait for the message to appear
    await waitFor(() =>
      expect(screen.getByText("This is a full stack app!")).toBeInTheDocument()
    );
  });

  test("calls getAllData with the correct URL", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("This is a full stack app!")).toBeInTheDocument()
    );
  });
});
