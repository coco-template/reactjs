/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React, { lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// internal
import { rootStore } from './rootstore';
import withLazySuspense from './hoc/withLazySuspense';
import './App.pcss';
// scope
const LazyHistoryWrapper = lazy(
  () => import(/* webpackChunkName: 'history' */ './pages/History')
);
const LazyDeviceWrapper = lazy(
  () => import(/* webpackChunkName: 'device' */ './pages/Device')
);
const LazyHistory = withLazySuspense(LazyHistoryWrapper);
const LazyDevice = withLazySuspense(LazyDeviceWrapper);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function App() {
  return (
    <Provider store={rootStore}>
      <BrowserRouter>
        <Switch>
          <Route path="/pwa/history" component={LazyHistory} />
          <Route path="/pwa/device" component={LazyDevice} />
          <Redirect to="/pwa/history" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
