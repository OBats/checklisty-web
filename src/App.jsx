/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import loaderStyle from './components/main/loader.module.css';
import { validateUser } from './api/auth-api';
import { saveUserData } from './actions/user';
import updateUser from './api/user';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  async componentDidMount() {
    if (!this.props.loggedUser && localStorage.getItem('access-token')) {
      try {
        const user = await validateUser();
        this.props.saveUserData(user);
      } catch {
        console.error('there is an error from request /api/auth/validate');
      }
    }
    this.setState({ fetching: false });
  }

  render() {
    const { fetching } = this.state;

    if (fetching) return <div className={loaderStyle.loader}>Loading...</div>;
    return <BrowserRouter><Routes /></BrowserRouter>;
  }
}

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
