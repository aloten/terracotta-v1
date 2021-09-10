import React, { Fragment, useContext, useState } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import uniqueBottles from '../../../data/uniqueBottlesSmall.json';
import { Grid } from '@material-ui/core';

const AddBottleBySearch = () => {
  const bottleContext = useContext(BottleContext);
  const { openBottleForm, changeForm } = bottleContext;

  const [value, setValue] = useState(null);
  // const [inputValue, setInputValue] = useState('');

  const onContinue = (e) => {
    e.preventDefault();
    for (const key in value) {
      changeForm(key, value[key]);
    }
    setValue(null);
    openBottleForm();
  };

  return (
    <form onSubmit={onContinue}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Autocomplete
            size='small'
            // freeSolo
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            style={{ padding: '10px 0' }}
            options={uniqueBottles}
            getOptionLabel={(option) => option.product}
            renderInput={(params) => (
              <Fragment>
                <TextField
                  {...params}
                  label='Search for a bottle to add'
                  style={{ background: 'white' }}
                  variant='outlined'
                  required
                />
              </Fragment>
            )}
          />
        </Grid>
        <Grid item xs={4} style={{ margin: 'auto 0' }}>
          <Button variant='contained' type='submit'>
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddBottleBySearch;
