/**
 * @description - redux connection
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { createEpicMiddleware } from 'redux-observable';
import { configureStore } from '@reduxjs/toolkit';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// internal
import { rootReducer, rootEpic } from './redux';

function createRootStore() {
  // epic middleware handle sideeffects
  const epicMiddleware = createEpicMiddleware();
  const rootEpic$ = new BehaviorSubject(rootEpic);
  // instantiate root store
  const rootstore = configureStore({
    reducer: rootReducer,
    middleware: [epicMiddleware],
  });

  // active epics
  epicMiddleware.run((...args) => {
    return rootEpic$.pipe(switchMap((epic) => epic(...args)));
  });

  if (module.hot) {
    module.hot.accept('./redux', () => {
      /* eslint-disable global-require, @typescript-eslint/no-var-requires */
      const {
        rootReducer: hotRootReducer,
        rootEpic: hotRootEpic,
      } = require('./redux');
      /* eslint-enable */

      // patch with latest
      rootEpic$.next(hotRootEpic);
      rootstore.replaceReducer(hotRootReducer);
    });
  }

  return rootstore;
}

export const rootStore = createRootStore();
