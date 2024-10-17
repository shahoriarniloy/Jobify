import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResumeForm from "./ResumeForm";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockStore = configureStore([]);
const store = mockStore({
  user: {
    currentUser: {
      email: "testuser@example.com",
      displayName: "Test User",
    },
  },
});

jest.mock("../../../../Hooks/UseAxiosSecure");

describe("ResumeForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form", () => {
    render(
      <Provider store={store}>
        <ResumeForm />
      </Provider>
    );

    expect(screen.getByText(/Resume Builder/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
  });

  test("handles input changes correctly", () => {
    render(
      <Provider store={store}>
        <ResumeForm />
      </Provider>
    );

    const phoneInput = screen.getByLabelText(/Phone:/i);
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");

    const linkedinInput = screen.getByLabelText(/LinkedIn:/i);
    fireEvent.change(linkedinInput, {
      target: { value: "https://linkedin.com/in/testuser" },
    });
    expect(linkedinInput.value).toBe("https://linkedin.com/in/testuser");
  });

  test("fetches user data on mount", async () => {
    axiosSecure.get.mockResolvedValueOnce({
      data: {
        name: "Test User",
        phone: "1234567890",
        email: "testuser@example.com",
        education: [],
        userInfo: [{ phone: "1234567890" }],
      },
    });

    render(
      <Provider store={store}>
        <ResumeForm />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Phone:/i).value).toBe("1234567890");
    });
  });

  test("submits the form successfully", async () => {
    axiosSecure.post.mockResolvedValueOnce({ status: 200 });

    render(
      <Provider store={store}>
        <ResumeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Phone:/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/LinkedIn:/i), {
      target: { value: "https://linkedin.com/in/testuser" },
    });

    fireEvent.click(screen.getByText(/Generate Resume/i));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Resume Informations Updated");
    });
  });

  test("handles submission failure", async () => {
    axiosSecure.post.mockRejectedValueOnce(
      new Error("Failed Saving Resume Information")
    );

    render(
      <Provider store={store}>
        <ResumeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Phone:/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText(/Generate Resume/i));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed Saving Resume Information"
      );
    });
  });
});
