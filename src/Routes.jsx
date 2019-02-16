import React from 'react';
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
import NewChecklistForm from './components/create-checklist/Form/NewChecklistForm';
import ProtectedRoute from './ProtectedRoute';

const Routes = props => (
  <React.Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin/" component={SignIn} />
      <Route exact path="/auth/signup/" component={SignUp} />
      <ProtectedRoute exact path="/profile/maininfo" loggedUser={props.loggedUser} component={ProfileInfo} />
      <ProtectedRoute exact path="/profile/mylists" loggedUser={props.loggedUser} component={ProfileLists} />
      <ProtectedRoute exact path="/profile/myteam" loggedUser={props.loggedUser} component={ProfileTeam} />
      <Route exact path="/home" component={MainPage} />
      <Route exact path="/home/:id" component={ShowCheckList} />
      <Route exact path="/create-checklist" component={NewChecklistForm} />
      <Redirect exact to="/" />
    </Switch>
  </React.Fragment>
);

export default Routes;
