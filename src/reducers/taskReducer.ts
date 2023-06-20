import {  ADD_TASK, EDIT_TASK, DELETE_TASK, TOGGLE_TASK, CLEAR_TASKS } from '../actions/taskAction';
import { Task, TaskActionTypes } from '../types';

export interface taskState {
  tasks: Task[];
}

const initialState: taskState = {
  tasks: [],
};

export const taskReducer = (state = initialState, action: TaskActionTypes): taskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        tasks: [...state.tasks, action.payload],
      };
    case EDIT_TASK:
      case EDIT_TASK:
        const updatedtask: Task = {
          ...action.payload,
          completed: state.tasks.find((task) => task.id === action.payload.id)?.completed || false,
        };
        return {
          tasks: state.tasks.map((task) =>
            task.id === action.payload.id ? updatedtask : task
          ),
        };      
    case DELETE_TASK:
      return {
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_TASK:
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
      case CLEAR_TASKS:
        return {
          tasks: [],
        };
    default:
      return state;
  }
};
