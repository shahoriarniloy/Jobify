import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import AdminOverview from "./AdminOverview";

jest.mock("../../../Hooks/UseAxiosSecure");

describe("AdminOverview Component", () => {
  const mockStats = {
    totalJobSeekers: 10,
    totalEmployers: 5,
    totalJobsPosted: 20,
    totalApplications: 15,
  };

  const mockRecentJobSeekers = [
    { _id: "1", name: "John Doe", email: "john@example.com" },
    { _id: "2", name: "Jane Smith", email: "jane@example.com" },
  ];

  const mockRecentJobs = [
    { _id: "1", title: "Software Engineer", company: "Tech Co." },
    { _id: "2", title: "Product Manager", company: "Biz Corp." },
  ];

  beforeEach(() => {
    axiosSecure.get.mockResolvedValueOnce({
      data: { total: mockStats.totalJobSeekers },
    });
    axiosSecure.get.mockResolvedValueOnce({
      data: { total: mockStats.totalEmployers },
    });
    axiosSecure.get.mockResolvedValueOnce({
      data: { total: mockStats.totalJobsPosted },
    });
    axiosSecure.get.mockResolvedValueOnce({
      data: { total: mockStats.totalApplications },
    });
    axiosSecure.get.mockResolvedValueOnce({
      data: mockRecentJobSeekers,
    });
    axiosSecure.get.mockResolvedValueOnce({
      data: mockRecentJobs,
    });
  });

  it("renders AdminOverview component correctly", async () => {
    render(<AdminOverview />);

    expect(
      await screen.findByText(mockStats.totalJobSeekers)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Job Seekers")).toBeInTheDocument();
    expect(
      await screen.findByText(mockStats.totalEmployers)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Employers")).toBeInTheDocument();
    expect(
      await screen.findByText(mockStats.totalJobsPosted)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Jobs Posted")).toBeInTheDocument();
    expect(
      await screen.findByText(mockStats.totalApplications)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Applications")).toBeInTheDocument();
  });

  it("displays recent job seekers and jobs", async () => {
    render(<AdminOverview />);

    expect(
      await screen.findByText(mockRecentJobSeekers[0].name)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobSeekers[0].email)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobSeekers[1].name)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobSeekers[1].email)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(mockRecentJobs[0].title)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobs[0].company)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobs[1].title)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(mockRecentJobs[1].company)
    ).toBeInTheDocument();
  });
});
