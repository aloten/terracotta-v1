import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login, loadUser, clearErrors } from '../../actions/authActions';
import { setAlert, removeAlert } from '../../actions/alertActions';

import { useHistory } from 'react-router-dom';

import { StyledLogin } from '../styles/Login.styled';

const Login = ({
  authState: { error, isAuthenticated },
  login,
  loadUser,
  clearErrors,
  alertState: { loginAlerts },
  setAlert,
  removeAlert,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      if (error !== 'No token, authorization denied.') {
        setAlert(error, 'login').then((id, timeout) => {
          removeAlert(id, timeout);
        });
        clearErrors();
      }
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'login').then((id, timeout) => {
        removeAlert(id, timeout);
      });
    } else {
      login({
        email,
        password,
      }).then(() => {
        loadUser();
      });
    }
  };

  const onGuestLogin = (e) => {
    e.preventDefault();
    login({
      email: 'guest@terracotta.com',
      password: '123456',
    }).then(() => {
      loadUser();
    });
  };

  const clickRegister = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  return (
    <StyledLogin>
      <span>{loginAlerts.length > 0 && loginAlerts[0].msg}</span>
      <div className='paper'>
        <h3 className='title'>Log In</h3>
        <form className='login-form' onSubmit={onSubmit}>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={onChange}
            required
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={onChange}
            required
          />
          <input className='btn btn-primary' type='submit' value='Log In' />
        </form>
        <a className='forgot-acct-link' href=''>
          Forgot account?
        </a>
        <div className='gst-reg-btns'>
          <button className='btn btn-neutral' onClick={onGuestLogin}>
            Log in as Guest
          </button>
          <button className='btn btn-success' onClick={clickRegister}>
            Register
          </button>
        </div>
      </div>
    </StyledLogin>
  );
};

Login.propTypes = {
  authState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  alertState: state.alertState,
});

export default connect(mapStateToProps, {
  login,
  loadUser,
  clearErrors,
  setAlert,
  removeAlert,
})(Login);
