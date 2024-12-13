// app.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { getAllData } from "./util/index";

// Mock the getAllData function
jest.mock("./util/index", () => ({
  getAllData: jest.fn(),
}));

const mockData = { data: "This is a full stack app!" };

describe("App Component", () => {
  beforeEach(() => {
    // Mock the API response
    getAllData.mockResolvedValue(mockData);
  });

  afterEach(() => {
    // Clear mocks after each test
    jest.clearAllMocks();
  });

  test("renders the message from the API", async () => {
    render(<App />);

    // Wait for the message to appear
    await waitFor(() =>
      expect(screen.getByText("This is a full stack app!")).toBeInTheDocument()
    );
  });

  test("calls getAllData with the correct URL", async () => {
    render(<App />);

    // Wait for the data to be fetched
    await waitFor(() =>
      expect(getAllData).toHaveBeenCalledWith("http://localhost:8000/api/v1/")
    );
  });
});
