/**
 * @description - just render real time component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
import { render } from 'react-dom';

// internal
import App from './App';

// scope
const container = document.querySelector('.main');

render(<App />, container);

// register service worker only in production
if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(() => {
          // tslint:disable-next-line:no-console
          console.log('service worker register success!');
        })
        .catch(() => {
          // tslint:disable-next-line:no-console
          console.log('service worker register failure!');
        });
    });
  }
}
