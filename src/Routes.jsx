import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
// import MainPage from './components/main/MainPage';
// import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';
import ProfileNav from './components/navProfile/ProfileNav';

const Routes = () => (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin/" component={SignIn} />
      <Route exact path="/auth/signup/" component={SignUp} />
      <Route exact path="/profile" component={ProfileNav} />
      <Redirect exact to="/" />
    </Switch>
  </div>
);

export default Routes;
