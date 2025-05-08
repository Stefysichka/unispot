import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ username: '', email: '', is_superuser: false });

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/api/auth/users/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setUsers(response.data))
    .catch(error => console.error('Error fetching users:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://127.0.0.1:8000/api/auth/users/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => fetchUsers());
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUser({
      username: user.username,
      email: user.email,
      is_superuser: user.is_superuser
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/api/auth/users/${editUserId}/`, editUser, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setEditUserId(null);
      setEditUser({ username: '', email: '', is_superuser: false });
      fetchUsers();
    });
  };

  return (
    <div className="admin-users">
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editUserId === user.id ? (
              <form onSubmit={handleUpdate} className ="edit-form">
                <span className= "edit-form-fields">
                  <input type="text"
                  value={editUser.username}
                  onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                  required
                />
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  required
                />
                <label>
                  <input
                    type="checkbox"
                    checked={editUser.is_superuser}
                    onChange={(e) => setEditUser({ ...editUser, is_superuser: e.target.checked })}
                  /> Адмін
                </label></span>
                <span className= "edit-form-buttons">
                  <button type="submit">Оновити</button>
                  <button type="button" onClick={() => setEditUserId(null)}>Скасувати</button>
                </span>
              </form>
            ) : (
              <>
                <div className="user-row">
                  <span>
                    {user.username} ({user.email}) {user.is_superuser ? "(Admin)" : ""}
                  </span>
                  <div className="buttons">
                    <button onClick={() => handleDelete(user.id)}>Видалити</button>
                    <button onClick={() => handleEdit(user)}>Редагувати</button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
