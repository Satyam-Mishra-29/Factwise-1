import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi'; // Import the search icon
import UserCard from './UserCard';
import DeleteDialog from './DeleteDialog';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('./celebrities.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filteredUsers with all users
      } catch (error) {
        setError(`Failed to fetch user data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      `${user.first} ${user.last}`.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  const handleDelete = () => {
    const updatedUsers = users.filter(user => user.id !== userToDelete);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setShowDeleteDialog(false);
  };

  const openDeleteDialog = (userId) => {
    setUserToDelete(userId);
    setShowDeleteDialog(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="user-list">
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search user"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onDelete={() => openDeleteDialog(user.id)} />
        ))
      ) : (
        <div>No users found.</div>
      )}

      {showDeleteDialog && (
        <DeleteDialog
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
};

export default UserList;
