import React from 'react';
import styled from 'styled-components';
import BottleForm from '../bottles/form/BottleForm';
import Inventory from '../bottles/Inventory';
import Dashboard from '../bottles/Dashboard';

const StyledHome = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  .dashboard {
    grid-column: 1 / 4;
    grid-row: 1;
  }
  .bottleForm {
    z-index: 1;
    grid-column: 1 / 4;
    grid-row: 2;
  }
  .inventory {
    grid-column: 1 / 4;
    grid-row: 3;
  }

  @media (min-width: 700px) {
    .bottleForm {
      grid-column: 1 / 2;
    }
  }
`;

const Home = () => {
  return (
    <StyledHome>
      <div className='dashboard'>
        <Dashboard />
      </div>
      <div className='bottleForm'>
        <BottleForm />
      </div>
      <div className='inventory'>
        <Inventory />
      </div>
    </StyledHome>
  );
};

export default Home;
