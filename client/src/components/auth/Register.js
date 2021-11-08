import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, loadUser, clearErrors } from '../../actions/authActions';
import { setAlert, removeAlert } from '../../actions/alertActions';
import { StyledRegister } from '../styles/Register.styled';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = ({
  authState: { error, isAuthenticated },
  register,
  loadUser,
  clearErrors,
  alertState: { registerAlerts },
  setAlert,
  removeAlert,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (typeof error === 'object') {
      // setAlert(error.msg, 'register');
      // clearErrors();
    } else {
      setAlert(error, 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setAlert('Please fill in all fields', 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
    } else if (password !== password2) {
      setAlert('Passwords must match', 'register').then((id, timeout) => {
        removeAlert(id, timeout);
      });
    } else {
      register({
        firstName,
        lastName,
        email,
        password,
      }).then(() => {
        loadUser();
      });
    }
  };

  return (
    <StyledRegister>
      <span>{registerAlerts.length > 0 && registerAlerts[0].msg}</span>
      <div className='paper'>
        <h3 className='title'>Register</h3>
        <form className='register-form' onSubmit={onSubmit}>
          <input
            type='text'
            name='firstName'
            value={firstName}
            placeholder='First name'
            onChange={onChange}
            required
          />
          <input
            type='text'
            name='lastName'
            value={lastName}
            placeholder='Last name'
            onChange={onChange}
            required
          />
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
          <input
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={onChange}
            required
          />
          <input className='btn btn-primary' type='submit' value='Register' />
        </form>
        <Link className='login-link' to='/login'>
          Already have an account?
        </Link>
      </div>
    </StyledRegister>
  );
};

Register.propTypes = {
  authState: PropTypes.object.isRequired,
  alertState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authState: state.authState,
  alertState: state.alertState,
});

export default connect(mapStateToProps, {
  register,
  loadUser,
  clearErrors,
  setAlert,
  removeAlert,
})(Register);
