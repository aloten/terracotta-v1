import React, { useContext } from 'react';
import Bottles from '../bottles/Bottles';
import BottleForm from '../bottles/form/BottleForm';
import BottleFilter from '../bottles/BottleFilter';
import BottleContext from '../../context/bottles/BottleContext';
import AddBottleBySearch from '../bottles/form/AddBottleBySearch';

const Home = () => {
  const bottleContext = useContext(BottleContext);
  const { current } = bottleContext;

  return (
    <div className='grid-2'>
      <div>{current ? <BottleForm /> : <AddBottleBySearch />}</div>
      <div>
        <BottleFilter />
        <Bottles />
      </div>
    </div>
  );
};

export default Home;
