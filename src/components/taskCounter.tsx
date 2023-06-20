import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/store';

const TaskCounter: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const completedtasksCount = tasks.tasks.filter((task) => task.completed).length;
  const incompletetasksCount = tasks.tasks.filter((task) => !task.completed).length;

  return (
    <div className="task-count-label">
      <p>Completed Tasks: {completedtasksCount}</p>
      <p>Incomplete Tasks: {incompletetasksCount}</p>
    </div>
  );
};

export default TaskCounter;
