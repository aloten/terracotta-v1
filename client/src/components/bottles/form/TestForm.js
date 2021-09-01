import React, { useState, useContext, useEffect } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import AlertContext from '../../../context/alert/AlertContext';

import CountryItem from './CountryItem';
import countryData from '../../../data/country-codes';
import VarietalItem from './VarietalItem';
import varietalData from '../../../data/varietals';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const TestForm = () => {
  const bottleContext = useContext(BottleContext);
  const { addBottle, updateBottle, current, clearCurrent } = bottleContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setBottle(current);
    } else {
      setBottle({
        product: '',
        vintage: '',
        producer: '',
        region: '',
        country: '',
        varietal: '',
        style: '',
        sugar: '',
        bubbles: '',
        criticsScore: '',
        quantity: '',
        price: '',
        totalCost: '',
        costPerBottle: '',
        size: '',
        countryCode: '',
        status: 'unopened',
      });
    }
  }, [bottleContext, current]);

  const [bottle, setBottle] = useState({
    product: '',
    vintage: '',
    producer: '',
    region: '',
    country: '',
    varietal: '',
    style: '',
    sugar: '',
    bubbles: '',
    criticsScore: '',
    quantity: '',
    price: '',
    totalCost: '',
    costPerBottle: '',
    size: '',
    countryCode: '',
    status: 'unopened',
  });

  const {
    product,
    vintage,
    varietal,
    region,
    country,
    style,
    sugar,
    bubbles,
    criticsScore,
    quantity,
    price,
    totalCost,
    costPerBottle,
    size,
    countryCode,
    status,
  } = bottle;

  const onChange = (e) => {
    if (e.target.name === 'totalCost') {
      setBottle({
        ...bottle,
        totalCost: e.target.value,
        costPerBottle: e.target.value / quantity,
      });
    } else if (e.target.name === 'costPerBottle') {
      setBottle({
        ...bottle,
        costPerBottle: e.target.value,
        totalCost: e.target.value * quantity,
      });
    } else if (
      e.target.name === 'quantity' &&
      (costPerBottle > 0 || totalCost > 0)
    ) {
      if (costPerBottle > 0) {
        setBottle({
          ...bottle,
          quantity: e.target.value,
          totalCost: e.target.value * costPerBottle,
        });
      } else {
        setBottle({
          ...bottle,
          cost: e.target.value,
          costPerBottle: totalCost / e.target.value,
        });
      }
    } else {
      setBottle({ ...bottle, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (product === '') {
      setAlert('Product name required', 'dark');
    } else {
      if (vintage === '') {
        setBottle({ ...bottle, vintage: 'N/A' });
      }

      if (current !== null) {
        updateBottle(bottle);
      } else {
        addBottle(bottle);
      }
      clearCurrent();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Edit Bottle</h2>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField id='standard-basic' label='Standard' />
        </Grid>
        <Grid item xs={6}>
          <TextField id='standard-basic' label='Standard' />{' '}
        </Grid>
        <Grid item xs={6}>
          <TextField id='standard-basic' label='Standard' />{' '}
        </Grid>
      </Grid>
    </form>
  );
};

export default TestForm;
