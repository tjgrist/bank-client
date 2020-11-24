import React from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { SecureRoute } from '@okta/okta-react';

export default function PrivateRoute({ component: Component, ...rest }) {

  return (
    <SecureRoute
      {...rest}
      component={(props) =>
      { <Component {...props} /> }
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};
