/* eslint-disable no-param-reassign */
// package
import { Epic, ofType } from 'redux-observable';
import { createSlice } from '@reduxjs/toolkit';
import { concat, timer, of } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';

// scope
const historySlice = createSlice({
  name: 'history',
  initialState: {
    cost: 0,
  },
  reducers: {
    increment(state) {
      state.cost += 1;
    },
    decrement(state) {
      state.cost -= 1;
    },
    rollback(state) {
      state.cost = 0;
    },
  },
});

// a little bit weired duck
export const { increment, decrement } = historySlice.actions;
export const historyReducer = historySlice.reducer;

// history epic here
export enum HistoryActionTypes {
  ActiveTiming = 'ActiveTiming',
  DeactiveTiming = 'DeactiveTiming',
}

export interface ActiveTimingAction {
  type: HistoryActionTypes.ActiveTiming;
}

export interface DeactiveTimingAction {
  type: HistoryActionTypes.DeactiveTiming;
}

export const historyEpic: Epic = (action$) => {
  // terminate timing
  const brake$ = action$.pipe(ofType(HistoryActionTypes.DeactiveTiming));

  return action$.pipe(
    ofType(HistoryActionTypes.ActiveTiming),
    switchMap(() =>
      concat(
        timer(0, 1000).pipe(
          takeUntil(brake$),
          map(() => historySlice.actions.increment())
        ),
        of(historySlice.actions.rollback())
      )
    )
  );
};
