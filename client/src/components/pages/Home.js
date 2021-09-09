import React, { Fragment } from 'react';
import BottleForm from '../bottles/form/BottleForm';
import Inventory from '../bottles/Inventory';

const Home = () => {
  return (
    <Fragment>
      <div className='grid-2'>
        <BottleForm />
      </div>
      <Inventory />
    </Fragment>
  );
};

export default Home;
