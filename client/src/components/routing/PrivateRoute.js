import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/authActions';

import Spinner from '../layout/Spinner';

const PrivateRoute = ({
  component: Component,
  authState: { isAuthenticated, loading },
  loadUser,
  ...rest
}) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : loading ? (
          <Spinner />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps, {
  loadUser,
})(PrivateRoute);
