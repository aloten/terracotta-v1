import React, { Fragment, useContext, useState, useEffect } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import AlertContext from '../../../context/alert/AlertContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import uniqueBottles from '../../../data/uniqueBottlesSmall.json';
import { Grid } from '@material-ui/core';

const AddBottleBySearch = () => {
  const bottleContext = useContext(BottleContext);
  const { bottleForm, nextStep, changeForm } = bottleContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    setValue(bottleForm);
    //eslint-disable-next-line
  }, []);

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const onContinue = (e) => {
    e.preventDefault();
    if (inputValue === '') {
      setAlert('Please fill out search field before continuing.', 'danger');
      return;
    } else if (typeof value === 'object') {
      for (const key in value) {
        changeForm(key, value[key]);
      }
    } else {
      changeForm('product', value);
    }
    nextStep();
  };

  return (
    <form onSubmit={onContinue}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Autocomplete
            size='small'
            freeSolo
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            style={{ padding: '10px' }}
            options={uniqueBottles}
            getOptionLabel={(option) => option.product}
            renderInput={(params) => (
              <Fragment>
                <TextField
                  {...params}
                  label='Search for a bottle'
                  variant='outlined'
                />
              </Fragment>
            )}
          />
        </Grid>
        <Grid item xs={4} style={{ margin: 'auto 0' }}>
          <Button variant='contained' onClick={onContinue}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddBottleBySearch;
