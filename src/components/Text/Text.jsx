/**
 * @description - Progress component showcase
 * @author - bornkiller <hjj491229492@hotmail.com>
 */
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import styles from './Text.pcss';

const Text = (props) => {
  const baseClassName = Reflect.get(styles, 'base');
  const themeClassName = Reflect.get(styles, props.theme);
  const alignClassName = Reflect.get(styles, props.align);
  const transformClassName = Reflect.get(styles, props.transform);
  const classNames = [
    baseClassName,
    themeClassName,
    alignClassName,
    transformClassName,
    props.className,
  ].join(' ');

  return <p className={classNames}>{props.children}</p>;
};

Text.propTypes = {
  theme: PropTypes.oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'light',
  ]).isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  transform: PropTypes.oneOf(['lowercase', 'uppercase', 'capitalize', 'noop']),
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};
Text.defaultProps = {
  align: 'left',
  transform: 'noop',
  className: '',
};

export default Text;
