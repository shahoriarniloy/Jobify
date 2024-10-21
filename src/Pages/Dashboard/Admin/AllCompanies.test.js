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
import AllCompanies from "./AllCompanies";

jest.mock("../../../Hooks/UseAxiosSecure");

describe("AllCompanies Component", () => {
  const mockCompanies = [
    {
      _id: "1",
      company_name: "Company A",
      industry: "Tech",
    },
    {
      _id: "2",
      company_name: "Company B",
      industry: "Finance",
    },
  ];

  beforeEach(() => {
    axiosSecure.get.mockResolvedValue({
      data: {
        Companies: mockCompanies,
        totalCompanies: 2,
      },
    });
  });

  it("renders AllCompanies component correctly", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllCompanies />
        </MemoryRouter>
      );
    });

    expect(await screen.findByText("Company A")).toBeInTheDocument();
    expect(await screen.findByText("Company B")).toBeInTheDocument();
  });

  it("displays an error message when fetch fails", async () => {
    axiosSecure.get.mockRejectedValue(new Error("Network Error"));
    await act(async () => {
      render(
        <MemoryRouter>
          <AllCompanies />
        </MemoryRouter>
      );
    });

    expect(
      await screen.findByText(
        "Failed to load companies. Please try again later."
      )
    ).toBeInTheDocument();
  });

  it("handles page navigation", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllCompanies />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /next/i }));
    });
  });

  it("changes items per page and resets current page", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AllCompanies />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/number of companies per page/i), {
        target: { value: "20" },
      });
    });

    expect(screen.getByLabelText(/number of companies per page/i).value).toBe(
      "20"
    );
  });
});
