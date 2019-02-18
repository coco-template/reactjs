/**
 * @description - implement lite loading effect
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import React, { FunctionComponent } from 'react';

// internal
import styles from './Loading.pcss';
import { LoadingProps } from './Loading.interface';

const Loading: FunctionComponent<LoadingProps> = (props) => {
  const { message } = props;

  return (
    <article className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles['cube-blue']} />
        <div className={styles['cube-green']} />
        <div className={styles['cube-pink']} />
        <div className={styles['cube-yellow']} />
        <div className={styles.message}>{message}</div>
      </div>
    </article>
  );
};

Loading.defaultProps = {
  message: 'Loading....',
};

export default Loading;
