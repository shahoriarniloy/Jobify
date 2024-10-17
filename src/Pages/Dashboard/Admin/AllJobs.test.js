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
import { MemoryRouter } from "react-router-dom";
import AllJobs from "./AllJobs";

jest.mock("../../../Hooks/UseAxiosSecure");

describe("AllJobs Component", () => {
  const mockJobs = [
    {
      _id: "1",
      title: "Frontend Developer",
      company: "Company A",
      salaryRange: "$70k - $90k",
    },
    {
      _id: "2",
      title: "Backend Developer",
      company: "Company B",
      salaryRange: "$80k - $100k",
    },
  ];

  beforeEach(() => {
    axiosSecure.get.mockResolvedValue({
      data: {
        jobs: mockJobs,
        totalJobs: 2,
      },
    });
  });

  it("renders AllJobs component correctly", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllJobs />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Number of Jobs Per Page:/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    });
  });

  it("displays the correct number of jobs", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllJobs />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getAllByRole("row")).toHaveLength(mockJobs.length + 1);
    });
  });

  it("handles pagination buttons correctly", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllJobs />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
    });

    const nextButton = screen.getByRole("button", { name: /next page/i });
    const prevButton = screen.getByRole("button", { name: /previous page/i });

    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });

  it("changes the number of jobs per page", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllJobs />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Number of Jobs Per Page:/i), {
        target: { value: "20" },
      });
    });

    expect(screen.getByDisplayValue("20")).toBeInTheDocument();
  });
});
