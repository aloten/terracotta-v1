import React, { Fragment } from 'react';

const LoginNew = () => {
  return (
    <Fragment>
      <div className='paper'>
        <form>
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
    </Fragment>
  );
};

export default LoginNew;
