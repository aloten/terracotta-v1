import React from 'react';
import styled from 'styled-components';
import BottleForm from '../bottles/form/BottleForm';
import Inventory from '../bottles/Inventory';
import Dashboard from '../bottles/Dashboard';

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Home = () => {
  return (
    <StyledHome>
      <Dashboard />
      <BottleForm />
      <Inventory />
    </StyledHome>
  );
};

export default Home;
