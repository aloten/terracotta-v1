import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearBottles } from '../../actions/bottleActions';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';

const Navbar = ({
  title,
  icon,
  clearBottles,
  authState: { isAuthenticated, user },
  logout,
}) => {
  const onLogout = () => {
    logout();
    clearBottles();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.firstName}</li>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Log Out</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  bottleState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

Navbar.defaultProps = {
  title: 'terracotta',
  icon: 'fas fa-wine-bottle',
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
  authState: state.authState,
});

export default connect(mapStateToProps, {
  logout,
  clearBottles,
})(Navbar);
