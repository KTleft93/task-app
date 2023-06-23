import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

const TaskCounter: React.FC = () => {

//get current tasks state from store and update UI
  const tasks = useSelector((state: RootState) => state.tasks);

  const completedTasksCount = tasks.tasks.filter((task) => task.completed).length;
  const incompleteTasksCount = tasks.tasks.filter((task) => !task.completed).length;

  return (
    <div className="Task-count-label">
      <p>Completed Tasks: {completedTasksCount}</p>
      <p>Incomplete Tasks: {incompleteTasksCount}</p>
    </div>
  );
};

export default TaskCounter;
