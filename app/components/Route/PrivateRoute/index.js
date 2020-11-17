import React from 'react';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLogged } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import { SecureRoute } from '@okta/okta-react';

const stateSelector = createStructuredSelector({
  isLogged: makeSelectIsLogged(),
});

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
