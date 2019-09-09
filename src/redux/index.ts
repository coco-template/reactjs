/**
 * @description - compose separate reducers
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
// internal
import { demoReducer } from './demo/demo.reducer';
import { demoEpic } from './demo/demo.epic';

export const rootReducer = combineReducers({
  demo: demoReducer,
});

export const rootEpic = combineEpics(demoEpic);
