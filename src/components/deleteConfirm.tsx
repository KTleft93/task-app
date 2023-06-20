import React from 'react';
import { addtask, edittask, deletetask, toggletask } from '../actions/taskAction';
import { Task } from '../types';

interface DeleteTodoModalProps {
  showModal: boolean;
  selectedtask: Task | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
  showModal,
  selectedtask,
  onConfirmDelete,
  onCancelDelete,
}) => {
  if (!showModal || !selectedtask) {
    return null; // Don't render the modal if showModal is false or selectedTodo is null
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-buttons">
          <button className="yes-button" onClick={onConfirmDelete}>Yes</button>
          <button className="no-button" onClick={onCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodoModal;
