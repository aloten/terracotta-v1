import React, { Fragment, useContext, useEffect } from 'react';
import BottleContext from '../../context/bottles/BottleContext';
import BottleItem from './BottleItem';
import Spinner from '../layout/Spinner';
import BottleFilter from './BottleFilter';

const Bottles = () => {
  const bottleContext = useContext(BottleContext);

  const { getBottles, bottles, filtered, loading } = bottleContext;

  useEffect(() => {
    getBottles();
    // eslint-disable-next-line
  }, []);

  if (bottles !== null && bottles.length === 0) {
    return <h4>Your wine bottle collection is currently empty. Add a bottle to start building your collection.</h4>;
  }
  let bottleCountMessage = "";
  if (bottles !== null) {
    bottleCountMessage = `Showing all ${bottles.length > 1? bottles.length :''} bottles in your collection.`;
  }
  if (filtered !== null) {
    if (filtered.length === 0) {
      bottleCountMessage = 'No bottles found that match your search term.';
    } else if (filtered.length > 0) {
      bottleCountMessage = `Showing ${filtered.length} bottle${filtered.length > 1?'s':''} matching your search term:`;
    }
  }

  return (
    <Fragment>
      {bottles !== null && !loading ? (
        <Fragment>
          <header id="bottles-header">
            <h2>Your bottle collection</h2>
            <BottleFilter />
          </header>
          <p>{bottleCountMessage}</p>
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
