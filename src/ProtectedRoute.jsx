/* eslint-disable react/require-render-return */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...protectedRouteProps }) => (
  <Route
    {...protectedRouteProps}
    render={props => (
      (protectedRouteProps.loggedUser ? <Component {...props} /> : (
        <Redirect to={{
          pathname: '/auth/signin/',
        }}
        />
      ))
    )}
  />
);

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
