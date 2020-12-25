/* eslint-disable no-param-reassign */
// package
import { Epic } from 'redux-observable';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { concat, timer, of } from 'rxjs';
import { switchMap, takeUntil, map, filter } from 'rxjs/operators';

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
// actions before
export const { increment, decrement } = historySlice.actions;
// reducer following
export const historyReducer = historySlice.reducer;

// history epic here
export const HistoryEpicActions = {
  ActiveTiming: createAction('history/ActiveTiming'),
  DeactiveTiming: createAction('history/DeactiveTiming'),
};

export const historyEpic: Epic = (action$) => {
  // terminate timing
  const brake$ = action$.pipe(filter(HistoryEpicActions.DeactiveTiming.match));

  return action$.pipe(
    filter(HistoryEpicActions.ActiveTiming.match),
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
