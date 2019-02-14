/* eslint-disable react/require-render-return */
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateUser } from './api/auth-api';
import { saveUserData } from './actions/user';


class ProtectedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  async componentDidMount() {
    if (!this.props.loggedUser) {
      try {
        const user = await validateUser();
        this.props.saveUserData(user);
        this.setState({ fetching: false });
      } catch {
        this.setState({ fetching: false });
      }
    } else {
      this.setState({ fetching: false });
    }
  }

  render() {
    const { loggedUser, path, exact, component } = this.props;
    const { fetching } = this.state;
    if (fetching) return 'Loading...';
    // eslint-disable-next-line react/jsx-filename-extension
    if (!loggedUser) return <Redirect to="/auth/signin/" />;
    return <Route path={path} exact={exact} component={component} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
