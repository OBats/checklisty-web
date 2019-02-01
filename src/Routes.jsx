import React from 'react';
import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth/signin/" component={SignIn} />
      <Route path="/auth/signup/" component={SignUp} />
      <Route exact path="/home" component={MainPage} />
      <Route exact path="/home/:id" component={ShowCheckList} />
      <Redirect to="/home" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
