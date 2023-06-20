import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addtask, edittask } from '../actions/taskAction';
import { Task } from '../types';

interface TaskInputProps {
  editMode: boolean;
  editingtask: Task | null;
  onCancelEdit: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ editMode, editingtask, onCancelEdit }) => {
  const [text, setText] = useState('');
  const [isValidInput, setValidInput] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode && editingtask) {
      setText(editingtask.text);
    }
  }, [editMode, editingtask]);

  const handleAddtask = () => {
    if (text.trim() === '') return;

    if (editMode && editingtask) {
      dispatch(edittask( editingtask.id, text ));
      onCancelEdit();
    } else {
      const newtask: Task = {
        id: Date.now(),
        text,
        completed: false,
      };
      dispatch(addtask(newtask));
    }

    setText('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredInputValue = inputValue.replace(/[^A-Za-z ]/g, '');
    setText(filteredInputValue);

    // Check input validity
    setValidInput(filteredInputValue === inputValue);
  };

  return (
    <div className="input-container">
      <input placeholder="Add your task..." className="task-input" type="text" value={text} onChange={handleChange} />
      {!isValidInput && <p style={{ color: 'red' }}>Please enter only characters. aA-Zz only.</p>}
      <button className="add-task-button" onClick={handleAddtask}>{editMode ? 'Save Task' : 'Add Task'}</button>
      {editMode && <button className="add-task-button" onClick={onCancelEdit}>Cancel</button>}
    </div>
  );
};

export default TaskInput;
