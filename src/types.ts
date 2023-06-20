export interface Task {
  id: number;
  text: string;
  completed: boolean;
}
export interface TaskState {
  tasks: Task[];
}

export const ADD_TASK = 'ADD_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
export const LOAD_TASKS = 'LOAD_TASKS';
export const CLEAR_TASKS = 'CLEAR_TASKS'

export interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

export interface EditTaskAction {
  type: typeof EDIT_TASK;
  payload: { id: number; text: string };
}

export interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: number;
}

export interface ToggleTaskAction {
  type: typeof TOGGLE_TASK;
  payload: number;
}

export interface LoadTasksAction {
  type: typeof LOAD_TASKS;
  payload: TaskState;
}

export interface ClearTasksAction {
  type: typeof CLEAR_TASKS;
  payload: []
}


export type TaskActionTypes =
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | ToggleTaskAction
  | LoadTasksAction
  | ClearTasksAction;