/* eslint-disable react/require-render-return */
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...protectedRouteProps }) => (
  <Route
    {...protectedRouteProps}
    render={props => (
      protectedRouteProps.loggedUser ? <Component {...props} /> : (
        <Redirect to={{
          pathname: '/auth/signin/',
        }}
        />
      )
    )}
  />
);

export default ProtectedRoute;
