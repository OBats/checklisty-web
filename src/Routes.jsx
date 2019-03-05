import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/form-based-auth/SignIn';
import SignUp from './components/auth/form-based-auth/SignUp';
import ProfileInfo from './components/profile/ProfileMainInfo';
import ProfileLists from './components/profile/MyLists';
import ProfileTeam from './components/profile/MyTeam';
import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';
import NewChecklistForm from './components/create-checklist/Form/NewChecklistForm';
import ProtectedRoute from './ProtectedRoute';
import NewChecklistMarkdown from './components/create-checklist/Markdown/NewChecklistMarkdown';

const Routes = () => (
  <React.Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin/" component={SignIn} />
      <Route exact path="/auth/signup/" component={SignUp} />
      <ProtectedRoute exact path="/profile/maininfo" component={ProfileInfo} />
      <ProtectedRoute exact path="/profile/mylists" component={ProfileLists} />
      <ProtectedRoute exact path="/profile/myteam" component={ProfileTeam} />
      <Route exact path="/home/:id" component={ShowCheckList} />
      <ProtectedRoute exact path="/create-checklist" component={NewChecklistForm} />
      <ProtectedRoute exact path="/create-checklist/markdown" component={NewChecklistMarkdown} />
      <Redirect exact to="/" />
    </Switch>
  </React.Fragment>
);

export default Routes;
