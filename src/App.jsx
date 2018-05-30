/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// internal
import './App.pcss';
import Gallery from './pages/Gallery';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/pwa/gallery" component={Gallery} />
        <Redirect to="/pwa/gallery" />
      </Switch>
    </BrowserRouter>
  );
}

export default hot(module)(App);
