import React, { useState, useEffect } from "react";
import axios from "axios";

function UserList() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "bob", age: "21" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8000/api/users/");
    setUsers(response.data);
  };

  const addUser = async () => {
    if (newUser.name.trim() && newUser.age) {
      await axios.post("http://localhost:8000/api/users/", newUser);
      setNewUser({ name: "", age: "" });
      fetchUsers();
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (Age: {user.age})
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        placeholder="Enter name"
      />
      <input
        type="number"
        value={newUser.age}
        onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        placeholder="Enter age"
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default UserList;
