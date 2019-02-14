/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import MainPage from './components/main/MainPage';
import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';
import ProfileNav from './components/navProfile/ProfileNav';
import NewChecklistForm from './components/create-checklist/NewChecklistForm';
import Logout from './components/auth/Logout';
import ProtectedRoute from './ProtectedRoute';

class Routes extends Component {
  render() {
    const { userData } = this.props;
    return (
      <React.Fragment>
        <NavBar user={userData} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/signin/" component={SignIn} />
          <Route exact path="/auth/signup/" component={SignUp} />
          <Route exact path="/profile" component={ProfileNav} />
          <Route exact path="/home" component={MainPage} />
          <Route exact path="/home/:id" component={ShowCheckList} />
          <Route exact path="/logout" component={Logout} />
          <ProtectedRoute exact path="/create_checklist" component={NewChecklistForm} />
          <Redirect exact to="/" />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userData: user.userData,
});

export default connect(mapStateToProps, null)(Routes);
