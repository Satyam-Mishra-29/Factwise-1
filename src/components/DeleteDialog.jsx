import React from 'react';

const DeleteDialog = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-dialog">
      <p>Are you sure you want to delete?</p>
      <button onClick={onCancel} class="Cancel">Cancel</button>
      <button onClick={onConfirm} className="delete-button">Delete</button>
    </div>
  );
};

export default DeleteDialog;
