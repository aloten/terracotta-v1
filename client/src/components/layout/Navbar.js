import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearBottles } from '../../actions/bottleActions';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { StyledNavbar } from '../styles/Navbar.styled';

import Button from '@material-ui/core/Button';

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

  const history = useHistory();

  const onLogoClick = (e) => {
    e.preventDefault();
    history.push('/');
  };

  // Create toggle effect for mobile nav hamburger
  useEffect(() => {
    const hamburgerToggle = document.querySelector('.hamburger-toggle');
    const navLinks = document.querySelector('.nav-links');

    hamburgerToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }, []);

  const authLinks = (
    <Fragment>
      <li>Hi, {user && user.firstName}</li>
      <li>
        <Link className='nav-link' to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/about'>
          About
        </Link>
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
        <Link className='nav-link' to='/login'>
          Log In
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/about'>
          About
        </Link>
      </li>
    </Fragment>
  );

  return (
    <StyledNavbar>
      <Button onClick={onLogoClick}>
        <h1 style={{ color: 'white' }}>
          <i className={icon} /> {title}
        </h1>
      </Button>
      <a href='#' className='hamburger-toggle'>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </a>
      <ul className='nav-links'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </StyledNavbar>
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
