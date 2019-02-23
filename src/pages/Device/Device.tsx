/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React from 'react';
import { Alert, Drawer } from 'antd';

// internal
import useDimension from '../../hooks/use-dimension';

function Device() {
  const title = 'Hooks Drawer';
  const placement = 'right';
  const { width, height } = useDimension();
  const message = `The browser viewport width: ${width}, height: ${height}, Celebration!`;

  return (
    <Drawer title={title} placement={placement} width={480} visible>
      <Alert message={message} />
    </Drawer>
  );
}

export default Device;
