import React from 'react';

const About = () => {
  return (
    <div>
      <h1>About This App</h1>
      <p className='my-1'>
        This is a full-stack React app for wine cellar inventory management and
        social networking
      </p>
      <ul>
        <li>
          <a
            href='https://github.com/aloten/terracotta-v1'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fab fa-github-square'></i>
          </a>
        </li>
        <li>
          <a
            href='https://www.linkedin.com/in/aidan-loten-a009b9141/'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fab fa-linkedin'></i>
          </a>
        </li>
      </ul>
      <ul className='nolink-icon'>
        <li>
          <a href='#'>
            <i className='fas fa-envelope-square'></i>
          </a>{' '}
          asloten@gmail.com
        </li>
        <li id='phone-icon'>
          <a href='#'>
            <i className='fas fa-phone-square'></i>
          </a>{' '}
          +1 (914) 274-7643
        </li>
      </ul>
      <p className='bg-dark p' style={{ marginTop: '10px' }}>
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
