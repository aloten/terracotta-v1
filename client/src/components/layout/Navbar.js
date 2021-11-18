import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearBottles } from '../../actions/bottleActions';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const StyledNavbar = styled.nav`
  display: block;
  text-align: center;
  color: white;
  background-color: ${(props) => props.theme.colors.primaryColor};

  .logo {
    color: white;
  }

  .logo:hover {
    cursor: pointer;
  }

  a {
    color: white;
  }

  .nav-links {
    display: none;
    text-align: center;
    justify-content: center;
  }

  .nav-links.active {
    display: block;
  }

  .hamburger-toggle {
    position: absolute;
    top: 0.75rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 2rem;
    height: 1.5rem;
  }

  .hamburger-toggle .bar {
    height: 3px;
    width: 100%;
    background-color: white;
    border-radius: 10px;
  }

  .greeting {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    color: white;
  }

  .nav-link {
    display: inline-block;
    height: 100%;
    width: 100%;
    padding: 0.5rem;
    color: white;
    border-top: 1px solid ${(props) => props.theme.colors.bgGrey};
  }

  .nav-link:hover,
  .nav-link:focus {
    background-color: #500020;
    color: white;
  }

  @media (min-width: 700px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem 2rem;
    width: 100%;
    margin-bottom: 0;

    .hamburger-toggle {
      display: none;
    }

    .nav-links {
      display: flex;
    }

    .greeting {
      margin-right: 1rem;
    }

    .nav-link {
      border: none;
    }

    .nav-link:hover {
      background-color: transparent;
      color: ${(props) => props.theme.colors.threeShadePrimary};
    }

    .logout {
      min-width: 100px;
    }
  }
`;

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
      <li className='greeting'>Hi, {user && user.firstName}</li>
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
        <a className='nav-link logout' onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i> <span>Log Out</span>
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
      <span className='logo' onClick={onLogoClick}>
        <h1>
          <i className={icon} /> {title}
        </h1>
      </span>
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
