/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { useEffect } from 'react';
import { Alert, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// internal
import { DeviceEpicActions } from '../../redux/device.slice';

// internal
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function Device() {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-undef
  const state = useSelector((as: AppState) => ({
    width: as.device.width,
    height: as.device.height,
  }));
  const title = 'Hooks Drawer';
  const placement = 'right';
  const message = `The browser viewport width: ${state.width}, height: ${state.height}, Celebration!`;

  useEffect(() => {
    dispatch(DeviceEpicActions.ActiveDimensionMonitor());

    return () => {
      dispatch(DeviceEpicActions.DeactiveDimensionMonitor());
    };
  }, []);

  return (
    <Drawer title={title} placement={placement} width={480} visible>
      <Alert message={message} />
    </Drawer>
  );
}

export default Device;
