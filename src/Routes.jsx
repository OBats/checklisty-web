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
import MainPage from './components/main/MainPage';
import ForgotPassword from './components/auth/forgot-password/ForgotPassword';
import ResetPassword from './components/auth/forgot-password/ResetPassword';

const Routes = () => (
  <React.Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth/signin/" component={SignIn} />
      <Route exact path="/auth/signup/" component={SignUp} />
      <Route exact path="/auth/forgot-password/" component={ForgotPassword} />
      <Route exact path="/auth/reset-password/" component={ResetPassword} />
      <ProtectedRoute exact path="/profile/maininfo" component={ProfileInfo} />
      <ProtectedRoute exact path="/profile/mylists" component={ProfileLists} />
      <ProtectedRoute exact path="/profile/myteam" component={ProfileTeam} />
      <Route exact path="/home/:id" component={ShowCheckList} />
      <Route exact path="/home/page=:number" component={MainPage} />
      <ProtectedRoute exact path="/create-checklist" component={NewChecklistForm} />
      <ProtectedRoute exact path="/create-checklist/markdown" component={NewChecklistMarkdown} />
      <Redirect exact to="/" />
    </Switch>
  </React.Fragment>
);

export default Routes;
