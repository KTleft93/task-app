import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addtask, edittask, deletetask, toggletask, loadtasks, cleartasks } from './actions/taskAction';
import { RootState } from './reducers/store';
import DeletetaskModal from './components/deleteConfirm';
import TaskCounter from './components/taskCounter';
import TaskInput from './components/taskInput';
import { TaskState, Task } from './types';
import './App.css';


const App: React.FC = () => {
  const [text, setText] = useState('');
  const [selectedtask, setSelectedtask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const tasks = useSelector((state:RootState) => state.tasks);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [editingtask, setEditingtask] =  useState<Task | null>(null);

  useEffect(() => {
    const savedtasks = localStorage.getItem('tasks');
    console.log(tasks)
    if (savedtasks) {
      console.log(tasks)
      const parsedtasks: TaskState = JSON.parse(savedtasks);
      dispatch(loadtasks(parsedtasks));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks)
  }, [tasks]);

 
  const handleEdittask = (task: Task) => {
    setEditMode(true);
    setEditingtask(task);
  };


  const handleCancelEdit = () => {
    setEditMode(false);
    setEditingtask(null);
  };


  const handleDeletetask = (task: Task) => {
    setSelectedtask(task);
    setShowModal(true);
  };

  const handleToggletask = (id: number) => {
    dispatch(toggletask(id));
  };

  const handleConfirmDelete = () => {
    if (selectedtask) {
      dispatch(deletetask(selectedtask.id));
      setShowModal(false);
    }
  };

  const handleCleartasks = () => {
    dispatch(cleartasks());
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const completedtasksCount = tasks.tasks.filter((task) => task.completed).length;
  const incompletetasksCount = tasks.tasks.filter((task) => !task.completed).length;

  return (
    <div>
      <h1 className="title">Task List</h1>
      <TaskInput editMode={editMode} editingtask={editingtask} onCancelEdit={handleCancelEdit} />
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
              onClick={() => handleToggletask(task.id)}
            >
              {task.text}
            </span>
            <div className="task-item-button-container">
            <button className="edit-task-button" onClick={() => handleEdittask(task)}>Edit</button>
            <button className="delete-task-button" onClick={() => handleDeletetask(task)}>Delete</button>
            </div>
          </li>
          </div>
        ))}
      </ul>
      </div>
      <DeletetaskModal
        showModal={showModal}
        selectedtask={selectedtask}
        onConfirmDelete={handleConfirmDelete}
        onCancelDelete={handleCancelDelete}
      />
      <button className="clear-task-button"onClick={handleCleartasks}>Clear All Tasks</button>
    </div>
  );
};

export default App;
