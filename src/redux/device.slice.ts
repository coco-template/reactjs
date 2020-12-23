/* eslint-disable no-param-reassign */
// package
import { Epic, ofType } from 'redux-observable';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, map, throttleTime } from 'rxjs/operators';

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
export const { resize } = deviceSlice.actions;
export const deviceReducer = deviceSlice.reducer;

// device epic here
export enum DeviceActionTypes {
  ActiveDimensionMonitor = 'ActiveDimensionMonitor',
  DeactiveDimensionMonitor = 'DeactiveDimensionMonitor',
}

export interface ActiveDimensionMonitorAction {
  type: DeviceActionTypes.ActiveDimensionMonitor;
}

export interface DeactiveDimensionMonitorAction {
  type: DeviceActionTypes.DeactiveDimensionMonitor;
}

export const deviceEpic: Epic = (action$) => {
  // terminate timing
  const brake$ = action$.pipe(
    ofType(DeviceActionTypes.DeactiveDimensionMonitor)
  );

  // takeUntil only terminate window resize listener, not action stream
  return action$.pipe(
    ofType(DeviceActionTypes.ActiveDimensionMonitor),
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
