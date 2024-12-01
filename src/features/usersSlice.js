import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    filteredUsers: [],
    searchQuery: "",
  },
  reducers: {
    setUsers: (state, action) => {
      state.usersList = action.payload;
      state.filteredUsers = action.payload;
    },
    filterUsers: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredUsers = state.usersList.filter(
        (user) =>
          user.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          user.email.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { setUsers, filterUsers } = usersSlice.actions;

export const selectUsers = (state) => state.users.filteredUsers;

export default usersSlice.reducer;
