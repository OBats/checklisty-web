import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MessageContainer } from './components/toasters/MessagesHandling';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/form-based-auth/SignIn';
import SignUp from './components/auth/form-based-auth/SignUp';
import ProfileInfo from './components/profile/ProfileMainInfo';
import ProfileLists from './components/profile/myLists';
import ProfileTeam from './components/profile/myTeam/index';
import TeamView from './components/profile/myTeam/teamView/TeamView';
import ShowCheckList from './components/main/MainPage/ShowCheckList';
import ShowTeamChecklist from './components/main/MainPage/ShowTeamChecklist';
import HomePage from './components/main/HomePage';
import NewChecklistForm from './components/create-checklist/Form/NewChecklistForm';
import ProtectedRoute from './ProtectedRoute';
import NewChecklistMarkdown from './components/create-checklist/Markdown/NewChecklistMarkdown';
import ForgotPassword from './components/auth/forgot-password/ForgotPassword';
import ResetPassword from './components/auth/forgot-password/ResetPassword';
import EditChecklistForm from './components/edit-checklist/EditForm/EditChecklistForm';
import EditChecklistMarkdown from './components/edit-checklist/EditMarkdown/EditChecklistMarkdown';
import AdminBoard from './components/admin/AdminBoard';
import NotFound404 from './components/utils/404-page';

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
      <ProtectedRoute exact path="/profile/myteam/:id" component={TeamView} />
      <ProtectedRoute exact path="/admin" component={AdminBoard} />
      <Route exact path="/:id" component={ShowCheckList} />
      <ProtectedRoute exact path="/create-checklist/form" component={NewChecklistForm} />
      <ProtectedRoute exact path="/create-checklist/markdown" component={NewChecklistMarkdown} />
      <ProtectedRoute exact path="/edit-checklist/:slug" component={EditChecklistForm} />
      <ProtectedRoute exact path="/edit-checklist-markdown/:slug" component={EditChecklistMarkdown} />
      <Route component={NotFound404} />
      <ProtectedRoute exact path="/profile/myteam/:id/:slug" component={ShowTeamChecklist} />
    </Switch>
    <MessageContainer />
  </React.Fragment>
);

export default Routes;
