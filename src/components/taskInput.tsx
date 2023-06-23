import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../actions/taskAction';
import { Task } from '../types';

interface TaskInputProps {
  editMode: boolean;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ editMode, editingTask, onCancelEdit }) => {
  const [text, setText] = useState('');
  const [isValidInput, setValidInput] = useState(true);
  const dispatch = useDispatch();
//trigger state change on passed props
  useEffect(() => {
    if (editMode && editingTask) {
      setText(editingTask.text);
    }
  }, [editMode, editingTask]);

  const handleAddTask = () => {
    if (text.trim() === '') return;

    if (editMode && editingTask) {
      dispatch(editTask( editingTask.id, text ));
      onCancelEdit();
    } else {
      const newTask: Task = {
        id: Date.now(),
        text,
        completed: false,
      };
      dispatch(addTask(newTask));
    }

    setText('');
  };

  //handle change on input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const filteredInputValue = inputValue.replace(/[^A-Za-z ]/g, '');
    setText(filteredInputValue);

    // Check input validity
    setValidInput(filteredInputValue === inputValue);
  };

  return (
    <div className="input-container">
      <input placeholder="Add your Task..." className="Task-input" type="text" value={text} onChange={handleChange} />
      {!isValidInput && <p style={{ color: 'red' }}>Please enter only characters. aA-Zz only.</p>}
      <button className="add-Task-button" onClick={handleAddTask}>{editMode ? 'Save Task' : 'Add Task'}</button>
      {editMode && <button className="add-Task-button" onClick={onCancelEdit}>Cancel</button>}
    </div>
  );
};

export default TaskInput;
