import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "../features/usersSlice";
import UserDetail from "./UserDetail";

const store = createStore(userReducer);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("UserDetail", () => {
  it("fetches and displays user details", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      website: "www.johndoe.com",
      company: { name: "ABC Corp" },
      address: { street: "123 Main St", city: "Anytown" },
    };

    // Mock the useParams hook to simulate the userId parameter
    jest
      .spyOn(require("react-router-dom"), "useParams")
      .mockReturnValue({ userId: "1" });

    // Mock the fetch request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    // Render the component with Router and Redux Provider
    render(
      <Provider store={store}>
        <Router>
          <UserDetail />
        </Router>
      </Provider>
    );

    // Check if user details are displayed
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("1234567890")).toBeInTheDocument();
      expect(screen.getByText("ABC Corp")).toBeInTheDocument();
      expect(screen.getByText("123 Main St")).toBeInTheDocument();
    });
  });
});
