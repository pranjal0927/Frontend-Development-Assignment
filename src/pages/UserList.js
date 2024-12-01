import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, filterUsers, selectUsers } from "../features/usersSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch(setUsers(data)));
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(filterUsers(e.target.value));
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search users..."
        className="p-2 mb-4 border rounded w-full"
        onChange={handleSearch}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded shadow-lg">
            <h2 className="font-semibold text-xl">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-600">{user.phone}</p>
            <p className="text-gray-600">{user.company.name}</p>
            <Link to={`/user/${user.id}`} className="text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
