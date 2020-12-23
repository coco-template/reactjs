/**
 * @description - compose separate reducers
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
// internal
import { historyReducer, historyEpic } from './history.slice';
import { deviceReducer, deviceEpic } from './device.slice';

// compose epic and reducers
export const rootEpic = combineEpics(historyEpic, deviceEpic);

export const rootReducer = combineReducers({
  history: historyReducer,
  device: deviceReducer,
});
