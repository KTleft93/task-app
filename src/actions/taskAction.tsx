import { Task, TaskActionTypes, TaskState, ClearTasksAction} from '../types';
export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const CLEAR_TASKS = 'CLEAR_TASKS';

export const addtask = (task: Task): TaskActionTypes => ({
  type: 'ADD_TASK',
  payload: task,
});

export const edittask = (id: number, text: string): TaskActionTypes => ({
  type: 'EDIT_TASK',
  payload: { id, text },
});

export const deletetask = (id: number): TaskActionTypes => ({
  type: 'DELETE_TASK',
  payload: id,
});

export const toggletask = (id: number): TaskActionTypes => ({
  type: 'TOGGLE_TASK',
  payload: id,
});

export const loadtasks = (tasks: TaskState): TaskActionTypes => ({
  type: 'LOAD_TASKS',
  payload: tasks,
});

export const cleartasks = (): ClearTasksAction => {
  return {
    type: CLEAR_TASKS,
    payload:[]
  }};
