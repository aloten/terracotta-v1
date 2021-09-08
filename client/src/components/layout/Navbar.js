import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/auth/AuthContext';
import BottleContext from '../../context/bottles/BottleContext';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;

  const bottleContext = useContext(BottleContext);
  const { clearBottles } = bottleContext;

  const onLogout = () => {
    logout();
    clearBottles();
  };

  const authLinks = (
    <Fragment>
      <li>Hello, {user && user.name}</li>
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
};

Navbar.defaultProps = {
  title: 'terracotta',
  icon: 'fas fa-wine-bottle',
};

export default Navbar;
