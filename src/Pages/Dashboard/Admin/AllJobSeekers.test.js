import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import AllJobSeekers from "./AllJobSeekers";

jest.mock("../../../Hooks/UseAxiosSecure");
jest.mock("react-toastify");

describe("AllJobSeekers Component", () => {
  const jobSeekersMock = [
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Developer",
    },
    { _id: "2", name: "Jane Doe", email: "jane@example.com", role: "Designer" },
  ];

  beforeEach(() => {
    axiosSecure.get.mockImplementation((url) => {
      if (url.includes("/job-seekers")) {
        return Promise.resolve({ data: jobSeekersMock });
      }
      return Promise.reject(new Error("Not Found"));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders job seekers table", async () => {
    await act(async () => {
      render(<AllJobSeekers />);
    });

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  test("handles search input", async () => {
    await act(async () => {
      render(<AllJobSeekers />);
    });

    const searchInput = screen.getByPlaceholderText(
      "Search Job Seekers by Name..."
    );

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "John" } });
    });

    expect(searchInput.value).toBe("John");
  });
});
