/* eslint-disable no-param-reassign */
// package
import { Epic } from 'redux-observable';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromEvent } from 'rxjs';
import {
  switchMap,
  takeUntil,
  map,
  throttleTime,
  filter,
} from 'rxjs/operators';

// interface
interface ResizePayload {
  width: number;
  height: number;
}

// scope
const deviceSlice = createSlice({
  name: 'device',
  initialState: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  reducers: {
    resize(state, action: PayloadAction<ResizePayload>) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

// a little bit weired duck
// actions before
export const { resize } = deviceSlice.actions;
// reducer following
export const deviceReducer = deviceSlice.reducer;

// device epic here
export const DeviceEpicActions = {
  ActiveDimensionMonitor: createAction('device/ActiveDimensionMonitor'),
  DeactiveDimensionMonitor: createAction('device/DeactiveDimensionMonitor'),
};

export const deviceEpic: Epic = (action$) => {
  // terminate timing
  const brake$ = action$.pipe(
    filter(DeviceEpicActions.DeactiveDimensionMonitor.match)
  );

  // takeUntil only terminate window resize listener, not action stream
  return action$.pipe(
    // declare epic action here for bettern action infer
    filter(DeviceEpicActions.ActiveDimensionMonitor.match),
    switchMap(() =>
      fromEvent(window, 'resize').pipe(
        throttleTime(100),
        map(() =>
          deviceSlice.actions.resize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        ),
        takeUntil(brake$)
      )
    )
  );
};
