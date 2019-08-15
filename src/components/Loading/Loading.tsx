/**
 * @description - implement lite loading effect
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React, { FunctionComponent } from 'react';

// internal
import { LoadingProps } from './Loading.interface';

const Loading: FunctionComponent<LoadingProps> = (props) => {
  return (
    <article className="polaris">
      <div className="polaris-spinner">
        <div className="polaris-cube polaris-cube--blue" />
        <div className="polaris-cube polaris-cube--green" />
        <div className="polaris-cube polaris-cube--pink" />
        <div className="polaris-cube polaris-cube--yellow" />
        <div className="polaris-message">{props.message || 'Loading....'}</div>
      </div>
    </article>
  );
};

export default Loading;
