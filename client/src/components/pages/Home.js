import React from 'react';
import Bottles from '../bottles/Bottles';
import BottleForm from '../bottles/form/BottleForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <BottleForm />
      </div>
      <div>
        <Bottles />
      </div>
    </div>
  );
};

export default Home;
