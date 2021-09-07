import React, { Fragment, useContext } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import AddBottleBySearch from './AddBottleBySearch';
import FormBottleDetails from './FormBottleDetails';

const BottleForm = () => {
  const bottleContext = useContext(BottleContext);
  const { step } = bottleContext;

  return (
    <Fragment>
      {step === 1 ? <AddBottleBySearch /> : <FormBottleDetails />}
    </Fragment>
  );
};

export default BottleForm;
