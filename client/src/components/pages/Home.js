import React from 'react';
import Bottles from '../bottles/Bottles';
import BottleForm from '../bottles/form/BottleForm';
import BottleFilter from '../bottles/BottleFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <BottleForm />
      <div>
        <BottleFilter />
        <Bottles />
      </div>
    </div>
  );
};

export default Home;
