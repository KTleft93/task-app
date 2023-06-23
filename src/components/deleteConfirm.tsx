import React from 'react';
import { addTask, editTask, deleteTask, toggleTask } from '../actions/taskAction';
import { Task } from '../types';

interface DeleteTodoModalProps {
  showModal: boolean;
  selectedTask: Task | null;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
}
//passed props to component
const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
  showModal,
  selectedTask,
  onConfirmDelete,
  onCancelDelete,
}) => {
  // Don't render the modal if showModal is false or selectedTodo is null
  if (!showModal || !selectedTask) {
    return null; 
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this Task?</p>
        <div className="modal-buttons">
          <button className="yes-button" onClick={onConfirmDelete}>Yes</button>
          <button className="no-button" onClick={onCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTodoModal;
