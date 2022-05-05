import { combineReducers } from 'redux';
import authStateReducer from './auth-state';
import boardStateReducer from './board-state';
import auxStateReducer from './aux-state';

const reducers = combineReducers({
  auth: authStateReducer,
  board: boardStateReducer,
  aux: auxStateReducer,
});

export default reducers;
