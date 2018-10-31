/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Lodable from 'react-loadable';
// internal
import Loading from './components/Loading';
import './App.pcss';
// scope
const LazyHistory = Lodable({
  loader: () => import(/* webpackChunkName: 'history' */ './pages/History'),
  loading: Loading,
});

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
