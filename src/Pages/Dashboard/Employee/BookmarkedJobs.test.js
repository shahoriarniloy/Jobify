import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axiosSecure from "../../../Hooks/UseAxiosSecure";
import BookmarkedJobs from "./BookmarkedJobs";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";

const mockStore = configureStore([]);
const mockAxios = new MockAdapter(axiosSecure);

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("BookmarkedJobs Component", () => {
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
    jest.clearAllMocks();
  });

  it("fetches and displays bookmarked jobs", async () => {
    const bookmarkedJobsData = [
      {
        _id: "1",
        title: "Frontend Developer",
        experience: "3 years",
        salaryRange: "$60,000 - $80,000",
        deadline: new Date().toISOString(),
        hasApplied: false,
      },
      {
        _id: "2",
        title: "Backend Developer",
        experience: "5 years",
        salaryRange: "$70,000 - $90,000",
        deadline: new Date().toISOString(),
        hasApplied: true,
      },
    ];

    const bookmarkResponse = [{ jobId: "1" }, { jobId: "2" }];

    mockAxios
      .onGet("/bookmarks?email=testuser@example.com")
      .reply(200, bookmarkResponse);

    mockAxios.onGet("/jobs/1").reply(200, bookmarkedJobsData[0]);

    mockAxios.onGet("/jobs/2").reply(200, bookmarkedJobsData[1]);

    mockAxios
      .onGet("/check_application", {
        params: { job_id: "1", user_email: "testuser@example.com" },
      })
      .reply(200, { applied: false });

    mockAxios
      .onGet("/check_application", {
        params: { job_id: "2", user_email: "testuser@example.com" },
      })
      .reply(200, { applied: true });

    render(
      <Provider store={store}>
        <BookmarkedJobs />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
      expect(screen.getByText(/Backend Developer/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Experience: 3 years/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience: 5 years/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Salary: \$60,000 - \$80,000/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Salary: \$70,000 - \$90,000/i)
    ).toBeInTheDocument();
  });

  it("allows deleting a bookmark", async () => {
    const bookmarkedJobsData = [
      {
        _id: "1",
        title: "Frontend Developer",
        experience: "3 years",
        salaryRange: "$60,000 - $80,000",
        deadline: new Date().toISOString(),
        hasApplied: false,
      },
    ];

    mockAxios
      .onGet("/bookmarks?email=testuser@example.com")
      .reply(200, [{ jobId: "1" }]);

    mockAxios.onGet("/jobs/1").reply(200, bookmarkedJobsData[0]);

    mockAxios
      .onGet("/check_application", {
        params: { job_id: "1", user_email: "testuser@example.com" },
      })
      .reply(200, { applied: false });

    mockAxios.onDelete(`/bookmarks/testuser@example.com/1`).reply(200);

    render(
      <Provider store={store}>
        <BookmarkedJobs />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Frontend Developer/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByTitle(/Remove Bookmark/i);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Bookmark Deleted");
    });
  });

  it('displays "No bookmarked jobs found" when no jobs are returned', async () => {
    mockAxios.onGet("/bookmarks?email=testuser@example.com").reply(200, []);

    render(
      <Provider store={store}>
        <BookmarkedJobs />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No bookmarked jobs found/i)).toBeInTheDocument();
    });
  });
});
