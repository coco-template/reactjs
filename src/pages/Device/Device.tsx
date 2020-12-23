/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { useEffect } from 'react';
import { Alert, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

// internal
import {
  DeviceActionTypes,
  ActiveDimensionMonitorAction,
  DeactiveDimensionMonitorAction,
} from '../../redux/device.slice';
import { AppState } from '../../rootstore';

// interface
type DeviceDispatcher = Dispatch<
  ActiveDimensionMonitorAction | DeactiveDimensionMonitorAction
>;

// internal
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Device() {
  const dispatch = useDispatch<DeviceDispatcher>();
  const state = useSelector((as: AppState) => ({
    width: as.device.width,
    height: as.device.height,
  }));
  const title = 'Hooks Drawer';
  const placement = 'right';
  const message = `The browser viewport width: ${state.width}, height: ${state.height}, Celebration!`;

  useEffect(() => {
    dispatch({
      type: DeviceActionTypes.ActiveDimensionMonitor,
    });

    return () => {
      dispatch({
        type: DeviceActionTypes.DeactiveDimensionMonitor,
      });
    };
  }, []);

  return (
    <Drawer title={title} placement={placement} width={480} visible>
      <Alert message={message} />
    </Drawer>
  );
}

export default Device;
