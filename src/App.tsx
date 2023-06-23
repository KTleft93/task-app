import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, deleteTask, toggleTask, loadTasks, clearTasks } from './actions/taskAction';
import { RootState } from './reducers/store';
import DeleteTaskModal from './components/deleteConfirm';
import TaskCounter from './components/taskCounter';
import TaskInput from './components/taskInput';
import { TaskState, Task } from './types';
import './App.css';


const App: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state:RootState) => state.tasks);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] =  useState<Task | null>(null);

  useEffect(() => {
    const savedTasks = localStorage.getItem('Tasks');
    
    if (savedTasks) {
      const parsedTasks: TaskState = JSON.parse(savedTasks);
      dispatch(loadTasks(parsedTasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(tasks));
  }, [tasks]);

 
  const handleEditTask = (Task: Task) => {
    setEditMode(true);
    setEditingTask(Task);
  };


  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingTask(null);
  };


  const handleDeleteTask = (Task: Task) => {
    setSelectedTask(Task);
    setShowModal(true);
  };

  const handleToggleTask = (id: number) => {
    dispatch(toggleTask(id));
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      dispatch(deleteTask(selectedTask.id));
      setShowModal(false);
    }
  };

  const handleClearTasks = () => {
    dispatch(clearTasks());
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1 className="title">Task List</h1>
      <TaskInput editMode={editMode} editingTask={editingTask} onCancelEdit={handleCancelEdit} />
      <TaskCounter/>
      <div className="card-list"> 
      <ul>
        {tasks.tasks.map((task: Task) => (
          <div className="task-item">
          <li key={task.id}>
            <span 
              className="task-item-name"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.text}
            </span>
            <div className="task-item-button-container">
            <button className="edit-task-button" onClick={() => handleEditTask(task)}>Edit</button>
            <button className="delete-task-button" onClick={() => handleDeleteTask(task)}>Delete</button>
            </div>
          </li>
          </div>
        ))}
      </ul>
      </div>
      <DeleteTaskModal
        showModal={showModal}
        selectedTask={selectedTask}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />
      <button className="clear-task-button"onClick={handleClearTasks}>Clear All Tasks</button>
    </div>
  );
};

export default App;
