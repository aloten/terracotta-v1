import React, { Fragment } from 'react';
import BottleForm from '../bottles/form/BottleForm';
import Inventory from '../bottles/Inventory';
import Dashboard from '../bottles/Dashboard';

const Home = () => {
  return (
    <Fragment>
      <div className='grid-2'>
        <div className='dashboard-container'>
          {' '}
          <Dashboard />
        </div>
        <div>
          {' '}
          <BottleForm />
        </div>
      </div>
      <Inventory />
    </Fragment>
  );
};

export default Home;
