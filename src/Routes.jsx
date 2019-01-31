import React, { Component } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
// import { Redirect } from 'react-router';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/auth/signin/" component={SignIn} />
      <Route path="/auth/signup/" component={SignUp} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
