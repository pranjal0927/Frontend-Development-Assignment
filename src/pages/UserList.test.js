import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, Router } from "react-router-dom";
import { createStore } from "redux";
import userReducer from "../features/usersSlice";
import UserList from "./UserList";

// Create a test store with the userReducer
const store = createStore(userReducer);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("UserList", () => {
  it("renders users and filters by search input", async () => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        company: { name: "ABC Corp" },
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "0987654321",
        company: { name: "XYZ Ltd" },
      },
    ];

    // Mock the useSelector hook to return the mock users
    jest
      .spyOn(require("react-redux"), "useSelector")
      .mockReturnValue(mockUsers);

    // Render the component with Router and Redux Provider
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Router>
            <UserList />
          </Router>
        </BrowserRouter>
      </Provider>
    );

    // Check if users are rendered
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Simulate typing in the search input to filter users
    fireEvent.change(screen.getByPlaceholderText(/search users/i), {
      target: { value: "Jane" },
    });

    // Check if filtering works by ensuring only Jane's name appears
    await waitFor(() => {
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).toBeNull();
    });
  });
});
