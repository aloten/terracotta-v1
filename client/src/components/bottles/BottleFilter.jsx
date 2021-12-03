import React, { useRef, useContext, useEffect } from 'react';
import BottleContext from '../../context/bottles/BottleContext';

const BottleFilter = () => {
  const bottleContext = useContext(BottleContext);

  const { filtered, filterBottles, clearFilter } = bottleContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = () => {
    if (text.current.value !== '') {
      filterBottles(text.current.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input type='text' ref={text} placeholder='search' onChange={onChange} />
    </form>
  );
};

export default BottleFilter;
