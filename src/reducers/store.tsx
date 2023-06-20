import { createStore, combineReducers } from 'redux';
import { taskReducer } from './taskReducer';
import {loadtasks} from '../actions/taskAction'
import { TaskActionTypes } from '../types';
import { TaskState } from '../types';


export interface RootState {
  tasks: TaskState;
}

const rootReducer = combineReducers<RootState>({
  tasks: taskReducer,
});

const savedtasks = localStorage.getItem('tasks');
const initialtasks: TaskState = savedtasks ? JSON.parse(savedtasks) : { tasks: [] };

const store = createStore(rootReducer, { tasks: initialtasks });

store.dispatch(loadtasks(initialtasks));

export {store};
