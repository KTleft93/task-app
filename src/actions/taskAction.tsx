import { Task, TaskActionTypes, TaskState, ClearTasksAction} from '../types';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const CLEAR_TASKS = 'CLEAR_TASKS';

export const addTask = (task: Task): TaskActionTypes => ({
  type: 'ADD_TASK',
  payload: task,
});

export const editTask = (id: number, text: string): TaskActionTypes => ({
  type: 'EDIT_TASK',
  payload: { id, text },
});

export const deleteTask = (id: number): TaskActionTypes => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const toggleTask = (id: number): TaskActionTypes => ({
  type: 'TOGGLE_TASK',
  payload: id,
});

export const loadTasks = (Tasks: TaskState): TaskActionTypes => ({
  type: 'LOAD_TASKS',
  payload: Tasks,
});

export const clearTasks = (): ClearTasksAction => {
  return {
    type: CLEAR_TASKS,
    payload:[]
  }};
