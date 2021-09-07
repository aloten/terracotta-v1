import React, { Fragment, useContext, useEffect } from 'react';
import BottleContext from '../../context/bottles/BottleContext';
import BottleItem from './BottleItem';
import Spinner from '../layout/Spinner';

const Bottles = () => {
  const bottleContext = useContext(BottleContext);

  const { getBottles, bottles, filtered } = bottleContext;

  useEffect(() => {
    getBottles();
    // eslint-disable-next-line
  }, []);

  if (bottles !== null && bottles.length === 0) {
    return <h4>Please add a bottle</h4>;
  }

  return (
    <Fragment>
      {bottles !== null ? (
        <Fragment>
          {filtered !== null
            ? filtered.map((bottle) => (
                <BottleItem key={bottle._id} bottle={bottle} />
              ))
            : bottles.map((bottle) => (
                <BottleItem key={bottle._id} bottle={bottle} />
              ))}
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Bottles;
