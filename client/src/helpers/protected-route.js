import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children, ...rest }) {

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          console.log("in protected there is a user: " + user);
          return React.cloneElement(children, { user });
        }

        else {
          console.log("in protected route: " + user);
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location }
              }}
            />
          );
        }
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired
};