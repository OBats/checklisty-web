/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import ProfileInfo from './components/profile/ProfileMainInfo';
import ProfileLists from './components/profile/MyLists';
import ProfileTeam from './components/profile/MyTeam';
import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';
import NewChecklistForm from './components/create-checklist/NewChecklistForm';
import ProtectedRoute from './ProtectedRoute';
import SignOut from './components/auth/SignOut';

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/signin/" component={SignIn} />
          <Route exact path="/auth/signup/" component={SignUp} />
          <Route exact path="/profile/maininfo" component={ProfileInfo} />
          <Route exact path="/profile/mylists" component={ProfileLists} />
          <Route exact path="/profile/myteam" component={ProfileTeam} />
          <Route exact path="/home" component={MainPage} />
          <Route exact path="/home/:id" component={ShowCheckList} />
          <ProtectedRoute exact path="/create_checklist" component={NewChecklistForm} />
          <Route exact path="/signout" component={SignOut} />
          <Redirect exact to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes;
