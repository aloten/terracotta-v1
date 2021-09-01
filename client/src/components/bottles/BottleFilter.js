import React, { useRef, useContext, useEffect } from 'react';
import BottleContext from '../../context/bottles/BottleContext';

const BottleFilter = () => {
  const bottleContext = useContext(BottleContext);

  const { bottles, filtered, filterBottles, clearFilter } = bottleContext;

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

  const visible = bottles !== null && bottles.length > 0;

  return (
    <form>
      <input type='search' style={{display: visible?'initial':'none'}} ref={text} placeholder='Search' onChange={onChange} />
    </form>
  );
};

export default BottleFilter;
