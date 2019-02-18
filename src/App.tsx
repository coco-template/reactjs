/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
// internal
import Loading from './components/Loading';
import './App.pcss';
// scope
const LazyHistoryWrapper = lazy(() =>
  import(/* webpackChunkName: 'history' */ './pages/History')
);
const fallback = <Loading message="Loading" />;
const LazyHistory = () => (
  <Suspense fallback={fallback}>
    <LazyHistoryWrapper />
  </Suspense>
);

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pwa/history" component={LazyHistory} />
        <Redirect to="/pwa/history" />
      </Switch>
    </BrowserRouter>
  );
}

export default hot(module)(App);
