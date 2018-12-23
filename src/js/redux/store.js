import { createStore } from 'redux';
import { passwordManagerApp, initialState } from './reducer'; 
 
export const store = createStore(passwordManagerApp, initialState);
