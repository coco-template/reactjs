/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React from 'react';
import { Alert, Drawer } from 'antd';

function Device() {
  const title = 'Hooks Drawer';
  const placement = 'right';
  const witdh = 480;
  const message = `The browser viewport width: 640, height: 1024`;

  return (
    <Drawer title={title} placement={placement} width={witdh} visible>
      <Alert message={message} />
    </Drawer>
  );
}

export default Device;
