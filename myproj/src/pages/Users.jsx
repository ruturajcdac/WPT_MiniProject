import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap'; // Import Form
import api from '../../src/api'; // Adjust path as needed

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [viewingUser, setViewingUser] = useState(null); // State for viewing user

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditFormData({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleUpdateUser = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, editFormData);
      setUsers(users.map((user) =>
        user.id === id ? { ...user, ...editFormData } : user
      ));
      setEditingUser(null);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error.response ? error.response.data : error.message);
      alert(`Error updating user: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        alert(`Error deleting user: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="container pt-5 pb-5">
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              {editingUser?.id === user.id ? (
                <>
                  <td>{user.id}</td>
                  <td>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <Button variant="success" size="sm" onClick={() => handleUpdateUser(user.id)}>
                      Save
                    </Button>{' '}
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button variant="primary" size="sm" onClick={() => setViewingUser(user)}>
                      View
                    </Button>{' '}
                    <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      {viewingUser && (
        <div className="mt-3">
          <h4>User Details</h4>
          <p>ID: {viewingUser.id}</p>
          <p>First Name: {viewingUser.firstName}</p>
          <p>Last Name: {viewingUser.lastName}</p>
          <p>Email: {viewingUser.email}</p>
          <p>Registered at: {new Date(viewingUser.createdAt).toLocaleString()}</p>
          <p>Last modified: {new Date(viewingUser.updatedAt).toLocaleString()}</p>
          <Button variant="secondary" size="sm" onClick={() => setViewingUser(null)}>Close</Button>
        </div>
      )}
    </div>
  );
}

export default Users;