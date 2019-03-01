/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import loaderStyle from './components/main/loader.module.css';
import { makingValidationOfUser } from './actions/user';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  async componentDidMount() {
    if (window.location.href.includes('?access-token=')) {
      const index = window.location.href.indexOf('?access-token=');
      let token = window.location.href.substring(index + 14);
      if (token.includes('#_=_')) {
        token = token.replace('#_=_', '');
      }
      window.location.href = window.location.href.slice(0, 21);
      localStorage.setItem('access-token', token);
    }
    if (!this.props.loggedUser && localStorage.getItem('access-token')) {
      await this.props.makingValidationOfUser();
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
  makingValidationOfUser: async () => {
    await dispatch(makingValidationOfUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
