import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearBottles } from '../../actions/bottleActions';
import { logout } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const StyledNavbar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.colors.primaryColor};

  a {
    color: white;
  }

  .logo-btn {
    padding: 0.5rem;
    color: white;
    background-color: ${(props) => props.theme.colors.primaryColor};
    font-size: 1.5rem;
  }

  .logo-btn:hover {
    cursor: pointer;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  .fa-bars,
  .fa-times {
    position: absolute;
    top: 0.45rem;
    right: 0.7rem;
  }

  .nav-links {
    width: 100%;
    text-align: center;
    justify-content: center;
  }

  .fa-bars,
  .fa-times {
    color: white;
    background-color: ${(props) => props.theme.colors.primaryColor};
  }

  .greeting {
    display: inline-block;
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 2rem;
    width: 100%;
    margin-bottom: 0;

    .fa-bars,
    .fa-times {
      display: none;
    }

    .logo-btn {
      width: 100%;
      text-align: left;
    }

    .nav-links {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    .greeting {
      width: auto;
      margin-right: 1.5rem;
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

  const windowSize = window.innerWidth >= 700;

  const [toggled, setToggled] = useState(windowSize);

  const toggleBars = () => {
    setToggled(!toggled);
  };

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
      <button className='logo-btn' onClick={onLogoClick}>
        <img
          className='logo'
          src='TerracottaLogo.png'
          height='50px'
          alt={title}
        />
      </button>
      <i
        onClick={toggleBars}
        className={toggled ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2x'}
      ></i>
      <ul className='nav-links' style={{ display: !toggled && 'none' }}>
        {toggled && (isAuthenticated ? authLinks : guestLinks)}
      </ul>
    </StyledNavbar>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  bottleState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

Navbar.defaultProps = {
  title: 'terracotta',
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
  authState: state.authState,
});

export default connect(mapStateToProps, {
  logout,
  clearBottles,
})(Navbar);
