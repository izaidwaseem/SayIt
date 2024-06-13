import React, { useState, useEffect } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "regular",
  });

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = editingUser || newUser;
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser && editingUser._id
        ? `http://localhost:3000/users/${editingUser._id}`
        : "http://localhost:3000/users";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        if (editingUser) {
          setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
          setEditingUser(null);
        } else {
          setUsers([...users, updatedUser]);
          setNewUser({ username: "", email: "", role: "regular" });
        }
      } else {
        console.error("Failed to submit user:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-management p-6 bg-[#E3FFDF]    rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">User Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            className="p-2 w-full border border-gray-300 rounded-md"
            placeholder="Username"
            value={editingUser ? editingUser.username : newUser.username}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, username: e.target.value })
                : setNewUser({ ...newUser, username: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            className="p-2 w-full border border-gray-300 rounded-md"
            placeholder="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <select
            value={editingUser ? editingUser.role : newUser.role}
            className="p-2 w-full border border-gray-300 rounded-md"
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, role: e.target.value })
                : setNewUser({ ...newUser, role: e.target.value })
            }
          >
            <option value="regular">Regular User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>
        <button
          className="w-full p-2 bg-[#DC97FF] text-black font-semibold rounded-md hover:bg-blue-300"
          type="submit"
        >
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user._id}
            className="p-4 bg-white rounded-md shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{user.username}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">{user.role}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingUser(user)}
                className="px-4 py-2 bg-[#DC97FF] text-black rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-4 py-2 bg-[#3C0663] text-[#F8F6E3] rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;