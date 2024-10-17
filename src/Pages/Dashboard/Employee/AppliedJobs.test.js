import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AppliedJobs from "./AppliedJobs";
import MockAdapter from "axios-mock-adapter";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);
const mockAxios = new MockAdapter(axiosSecure);

describe("AppliedJobs Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        currentUser: {
          email: "testuser@example.com",
        },
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("fetches and displays applied jobs", async () => {
    const appliedJobsData = [
      {
        _id: "1",
        title: "Frontend Developer",
        company: "Tech Corp",
        salaryRange: "$60,000 - $80,000",
        location: "New York, NY",
        status: "Under Review",
      },
      {
        _id: "2",
        title: "Backend Developer",
        company: "Dev Solutions",
        salaryRange: "$70,000 - $90,000",
        location: "San Francisco, CA",
        status: "Under Review",
      },
    ];

    mockAxios
      .onGet("/check-applied-jobs?email=testuser@example.com")
      .reply(200, appliedJobsData);

    render(
      <Provider store={store}>
        <AppliedJobs />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    });

    const jobStatusElements = screen.getAllByTestId("job-status");

    expect(jobStatusElements.length).toBe(2);
    jobStatusElements.forEach((element) =>
      expect(element).toHaveTextContent("Under Review")
    );
  });

  it('displays "No applied jobs found" when no jobs are returned', async () => {
    mockAxios
      .onGet("/check-applied-jobs?email=testuser@example.com")
      .reply(200, []);

    render(
      <Provider store={store}>
        <AppliedJobs />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/No applied jobs found/i)).toBeInTheDocument();
    });
  });

  it("displays error message when fetching jobs fails", async () => {
    mockAxios
      .onGet("/check-applied-jobs?email=testuser@example.com")
      .reply(500);

    render(
      <Provider store={store}>
        <AppliedJobs />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(/Error fetching applied jobs/i)
      ).toBeInTheDocument();
    });
  });
});
