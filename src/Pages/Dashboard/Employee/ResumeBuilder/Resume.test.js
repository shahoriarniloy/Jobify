import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Resume from "./Resume";
import { createStore } from "redux";
import axiosSecure from "../../../../Hooks/UseAxiosSecure";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";
const initialState = {
  user: {
    loading: false,
    currentUser: { email: "test@example.com" },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

describe("Resume Component", () => {
  let store;
  let mockAxios;

  beforeEach(() => {
    store = createStore(reducer);

    mockAxios = new MockAdapter(axiosSecure);
  });

  afterEach(() => {
    if (mockAxios) {
      mockAxios.restore();
    }
  });

  it("renders resume data", async () => {
    const mockResumeData = {
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      objective: "Seeking a challenging position.",
      skills: ["JavaScript", "React", "Node.js"],
      experiences: [
        {
          jobTitle: "Software Engineer",
          company: "Tech Co.",
          startDate: "Jan 2020",
          endDate: "Present",
          description: "Developed web applications.",
        },
      ],
      projects: [
        {
          title: "Portfolio Website",
          link: "https://johndoe.com",
          description: "My personal portfolio.",
          technologies: "HTML, CSS, JavaScript",
        },
      ],
      education: [
        {
          schoolName: "University of Example",
          degree: "Bachelor of Science in Computer Science",
          endDate: "2020",
        },
      ],
      languages: ["English", "Spanish"],
    };

    mockAxios.onGet("/resume/test@example.com").reply(200, mockResumeData);

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            {" "}
            <Resume />
          </MemoryRouter>
        </Provider>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(/Download Resume/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Seeking a challenging position/i)
    ).toBeInTheDocument();
  });
});
