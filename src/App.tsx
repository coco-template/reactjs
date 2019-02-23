/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React, { lazy } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// internal
import withLazySuspense from './HOC/withLazySuspense';
import './App.pcss';
// scope
const LazyHistoryWrapper = lazy(() =>
  import(/* webpackChunkName: 'history' */ './pages/History')
);
const LazyDeviceWrapper = lazy(() =>
  import(/* webpackChunkName: 'history' */ './pages/Device')
);
const LazyHistory = withLazySuspense(LazyHistoryWrapper);
const LazyDevice = withLazySuspense(LazyDeviceWrapper);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pwa/history" component={LazyHistory} />
        <Route path="/pwa/device" component={LazyDevice} />
        <Redirect to="/pwa/history" />
      </Switch>
    </BrowserRouter>
  );
}

export default hot(module)(App);