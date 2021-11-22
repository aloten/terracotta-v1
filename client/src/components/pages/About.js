import React from 'react';
import styled from 'styled-components';

const StyledAbout = styled.div`
  .title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .fa-github-square,
  .fa-linkedin {
    font-size: 2rem;
    color: royalblue;
  }

  .fa-github-square:hover,
  .fa-linkedin:hover {
    color: #3333dd;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .fa-envelope-square:hover,
  .fa-phone-square:hover {
    cursor: default;
  }
`;

const About = () => {
  return (
    <StyledAbout>
      <div className='title'>
        <h1>About This App</h1>
        <a
          href='https://github.com/aloten/terracotta-v1'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fab fa-github-square'></i>
        </a>
        <a
          href='https://www.linkedin.com/in/aidan-loten-a009b9141/'
          target='_blank'
          rel='noreferrer'
        >
          <i className='fab fa-linkedin'></i>
        </a>
      </div>
      <div className='content'>
        <p>
          This is a full-stack app for wine cellar inventory management,
          trading, and social networking.
        </p>
        <span>
          <i className='fas fa-envelope-square'></i> asloten@gmail.com
        </span>
        <span>
          <i className='fas fa-phone-square'></i> +1 (914) 274-7643
        </span>
        <p className='version'>
          <strong>Version: </strong> 1.0.0
        </p>
      </div>
    </StyledAbout>
  );
};

export default About;
