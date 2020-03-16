import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'); // eslint-disable-line
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = querystring('redirect');

  return (
    <Route
      {...rest} // eslint-disable-line
      render={props =>
        !cProps.loggedIn ? (
          <C {...props} {...cProps} /> // eslint-disable-line
        ) : (
          <Redirect
            to={redirect === '' || redirect === null ? '/' : redirect}
          />
        )
      }
    />
  );
};
