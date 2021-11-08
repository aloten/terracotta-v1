import React from 'react';
import { StyledLogin } from '../styles/Login.styled';

const Login = () => {
  return (
    <StyledLogin>
      <div className='paper'>
        <h3 className='title'>Log In</h3>
        <form className='login-form'>
          <input type='email' name='email' placeholder='email' required />
          <input type='text' name='password' placeholder='password' required />
          <input className='btn btn-primary' type='submit' value='Log In' />
        </form>
        <a className='forgot-acct-link' href=''>
          Forgot account?
        </a>
        <div className='gst-reg-btns'>
          <button className='btn btn-neutral'>Log in as Guest</button>
          <button className='btn btn-success'>Register</button>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
