import { createStore, combineReducers } from 'redux';
import { taskReducer } from './taskReducer';
import {loadTasks} from '../actions/taskAction'
import { TaskActionTypes } from '../types';
import { TaskState } from '../types';


export interface RootState {
  tasks: TaskState;
}

const rootReducer = combineReducers<RootState>({
  tasks: taskReducer,
});

const savedTasks = localStorage.getItem('tasks');
const initialTasks: TaskState = savedTasks ? JSON.parse(savedTasks) : { Tasks: [] };

const store = createStore(rootReducer, {tasks: initialTasks });

store.dispatch(loadTasks(initialTasks));

export {store};
