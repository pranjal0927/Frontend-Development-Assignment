import reducer, { setUsers, filterUsers } from "./usersSlice";

describe("usersSlice", () => {
  const initialState = {
    usersList: [],
    filteredUsers: [],
    searchQuery: "",
  };

  it("should handle setUsers", () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    const action = setUsers(users);
    const state = reducer(initialState, action);

    expect(state.usersList).toEqual(users);
    expect(state.filteredUsers).toEqual(users);
  });

  it("should handle filterUsers", () => {
    const users = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];
    const filteredUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
    ];
    const action = filterUsers("john");
    const state = reducer({ ...initialState, usersList: users }, action);

    expect(state.filteredUsers).toEqual(filteredUsers);
  });
});
