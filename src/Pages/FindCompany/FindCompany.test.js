import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import FindCompany from "./FindCompany";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
const mockAxiosSecure = new MockAdapter(axiosSecure);

describe("FindCompany Component", () => {
  afterEach(() => {
    mockAxiosSecure.reset();
  });

  it("fetches and displays companies", async () => {
    mockAxiosSecure.onGet("/companies?page=0&size=10").reply(200, {
      Companies: [
        {
          email: "test@example.com",
          company_name: "Test Company",
          industry: "Tech",
          company_size: "100",
        },
      ],
      totalCompanies: 1,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <FindCompany />
        </MemoryRouter>
      );
    });

    expect(await screen.findByText(/test company/i)).toBeInTheDocument();
  });

  it("handles errors during fetching", async () => {
    mockAxiosSecure.onGet("/companies?page=0&size=10").reply(500);

    await act(async () => {
      render(
        <MemoryRouter>
          <FindCompany />
        </MemoryRouter>
      );
    });

    fireEvent.click(screen.getByText(/Find Company/i));

    expect(
      await screen.findByText(
        /failed to fetch companies. please try again later./i
      )
    ).toBeInTheDocument();
  });
});
