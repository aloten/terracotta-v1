import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, error } = authContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }
    if (error) {
      setAlert(error, 'dark');
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      setAlert('Please fill in all fields', 'dark');
    } else if (password !== password2) {
      setAlert('Passwords must match', 'dark');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={name}
            name='name'
            onChange={onChange}
            placeholder='Name'
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            value={email}
            name='email'
            onChange={onChange}
            placeholder='Email'
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password}
            name='password'
            onChange={onChange}
            placeholder='New password'
            // required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            value={password2}
            name='password2'
            onChange={onChange}
            placeholder='Confirm password'
            // required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
