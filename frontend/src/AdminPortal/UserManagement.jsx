import React, { useState, useEffect } from "react";

const UserManagement = () => {
  // State variables for managing users
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "regular", // Default role
  });

  // Function to fetch users data from API
  const fetchUsers = async () => {
    try {
      // Fetch users data from API endpoint
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

  // Function to handle form submission for adding/editing users
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingUser) {
        // Perform update operation
        const response = await fetch(`API_ENDPOINT/users/${editingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingUser),
        });
        if (response.ok) {
          // Update user in state
          const updatedUser = await response.json();
          const updatedUsers = users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          setUsers(updatedUsers);
          setEditingUser(null);
        } else {
          console.error("Failed to update user:", response.statusText);
        }
      } else {
        // Perform create operation
        const response = await fetch("API_ENDPOINT/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        if (response.ok) {
          // Add new user to state
          const newUser = await response.json();
          setUsers([...users, newUser]);
          setNewUser({
            username: "",
            email: "",
            role: "regular",
          });
        } else {
          console.error("Failed to create user:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`API_ENDPOINT/users/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remove deleted user from state
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    // Fetch users data when component mounts
    fetchUsers();
  }, []);

  return (
    <div className="user-management">
      <h2>User Management</h2>
      {/* Form for adding/editing users */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={editingUser ? editingUser.username : newUser.username}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, username: e.target.value })
              : setNewUser({ ...newUser, username: e.target.value })
          }
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : setNewUser({ ...newUser, email: e.target.value })
          }
          required
        />
        <select
          value={editingUser ? editingUser.role : newUser.role}
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
        <button type="submit">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>
      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email} - {user.role}
            <button onClick={() => setEditingUser(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
