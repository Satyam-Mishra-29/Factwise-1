import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiTrash2, FiEdit } from 'react-icons/fi';

const UserCard = ({ user, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(user);

  const toggleOpen = () => setIsOpen(!isOpen);
  const toggleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add API call or state update logic here if needed
  };

  return (
    <div className="user-card">
      <div className="card-header" onClick={!isEditing ? toggleOpen : undefined}>
        <img src={user.picture} alt={`${user.first} ${user.last}`} className="avatar" />
        <h3>{userData.first} {userData.last}</h3>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {isOpen && (
        <div className="card-content">
          {!isEditing ? (
            <>
              <p><strong>Date of Birth :</strong> {userData.dob}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Country:</strong> {userData.country}</p>
              <p><strong>Description:</strong> {userData.description}</p>
              <div className="actions">
                <FiTrash2 onClick={onDelete}  class="Icon"/>
                <FiEdit onClick={toggleEdit} class="Icon"/>
              </div>
            </>
          ) : (
            <>
              <input type="text" name="first" value={userData.first} onChange={handleChange} />
              <input type="text" name="last" value={userData.last} onChange={handleChange} />
              <input type="text" name="dob" value={userData.dob} onChange={handleChange} />
              <input type="text" name="gender" value={userData.gender} onChange={handleChange} />
              <input type="text" name="email" value={userData.email} onChange={handleChange} />
              <input type="text" name="country" value={userData.country} onChange={handleChange} />
              <textarea name="description" value={userData.description} onChange={handleChange} />
              <div className="actions">
                <button onClick={() => setIsEditing(false)} class="ChangeBtn cancel">Cancel</button>
                <button onClick={handleSave} class="ChangeBtn save">Save</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
