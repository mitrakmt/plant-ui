import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { verifyToken, getAuthToken } from 'utils/token';

export default ({ component: C, props: cProps, ...rest }) => {
  let decoded = verifyToken(getAuthToken());

  return (
    <Route
      {...rest} // eslint-disable-line
      render={props =>
        cProps.loggedIn && decoded ? (
          <C {...props} {...cProps} /> // eslint-disable-line
        ) : (
          <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`} />
        )
      }
    />
  );
};
