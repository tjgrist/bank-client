import PropTypes from 'prop-types';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { routes } from 'utils';

export default function PublicRoute({
  component: Component,
  restricted,
  ...rest
}) {

  return (
    <Route
      {...rest}
      render={(props) =>
         restricted ? (
          <Redirect to={routes.home.path} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  restricted: PropTypes.bool,
};
