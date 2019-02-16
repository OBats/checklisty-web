/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { validateUser } from './api/auth-api';
import { saveUserData } from './actions/user';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  async componentDidMount() {
    if (!this.props.loggedUser) {
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

    if (fetching) return 'Loading...';
    // eslint-disable-next-line react/jsx-filename-extension
    return <BrowserRouter><Routes loggedUser={this.props.loggedUser} /></BrowserRouter>;
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
