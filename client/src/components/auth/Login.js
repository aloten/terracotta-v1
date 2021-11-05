import React from 'react';
import { StyledLogin } from '../styles/Login.styled';

const Login = () => {
  return (
    <StyledLogin>
      <div className='paper'>
        <form className='login-form'>
          <input type='text' name='email' />
          <input type='text' name='password' />
          <input type='submit' />
        </form>
        <a href=''>Forgot account?</a>
        <div className='flex-container'>
          <button>Log in as Guest</button>
          <button>Register</button>
        </div>
      </div>
    </StyledLogin>
  );
};

export default Login;
