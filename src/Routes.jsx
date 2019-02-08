import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ShowCheckList from './components/main/ShowCheckList';
import HomePage from './components/main/HomePage';
import ProfileNav from './components/navProfile/ProfileNav';
import { validateUser } from './api/auth-api';
import Logout from './components/auth/Logout';
class Routes extends Component {
  state = {};
  
  async componentDidMount() {
    try {
      const token = await localStorage.getItem('access-token');
      const user = await validateUser();
      this.setState({ user });
    } catch(err) {
      return null;
    }
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/signin/" component={SignIn} />
          <Route exact path="/auth/signup/" component={SignUp} />
          <Route exact path="/profile" component={ProfileNav} />
          <Route exact path="/home/:id" component={ShowCheckList} />
          <Route exact path="/logout" component={Logout} />
          <Redirect exact to="/" />
        </Switch>
      </React.Fragment>
    );
  };
};

export default Routes;
