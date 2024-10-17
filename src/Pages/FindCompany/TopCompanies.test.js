import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TopCompanies from "./TopCompanies";
import axiosSecure from "../../Hooks/UseAxiosSecure";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockAxios = new MockAdapter(axiosSecure);

describe("TopCompanies Component", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it("fetches and displays top companies", async () => {
    const companiesData = [
      {
        company_name: "Test Company",
        company_logo: "http://example.com/logo.png",
        company_description: "This is a test company.",
        email: "test@example.com",
      },
      {
        company_name: "Another Company",
        company_logo: "http://example.com/logo2.png",
        company_description: "This is another test company.",
        email: "another@example.com",
      },
    ];

    mockAxios.onGet("/companies/top").reply(200, companiesData);

    render(
      <MemoryRouter>
        <TopCompanies />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Top Companies/i)).toBeInTheDocument();

    const companyNames = await screen.findAllByText(/Test Company/i);
    expect(companyNames.length).toBeGreaterThan(0);

    const anotherCompany = await screen.findAllByText(/Another Company/i);
    expect(anotherCompany.length).toBeGreaterThan(0);

    expect(screen.getByText(/This is a test company/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is another test company/i)
    ).toBeInTheDocument();
  });

  it("displays error message when fetching fails", async () => {
    mockAxios.onGet("/companies/top").reply(500);

    render(
      <MemoryRouter>
        <TopCompanies />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Top Companies/i)).toBeInTheDocument();
    expect(await screen.findByText(/Error:/i)).toBeInTheDocument();
  });

  it("displays message when no companies are found", async () => {
    mockAxios.onGet("/companies/top").reply(200, []);

    render(
      <MemoryRouter>
        <TopCompanies />
      </MemoryRouter>
    );

    expect(await screen.findByText(/No companies found/i)).toBeInTheDocument();
  });
});
