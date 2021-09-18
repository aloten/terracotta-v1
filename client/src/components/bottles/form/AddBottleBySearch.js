import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import uniqueBottles from '../../../data/uniqueBottlesSmall.json';
import { Grid } from '@material-ui/core';

const AddBottleBySearch = ({ openBottleForm, changeFormProp }) => {
  const [value, setValue] = useState(null);
  // const [inputValue, setInputValue] = useState('');

  const onContinue = (e) => {
    e.preventDefault();
    for (const key in value) {
      if (value[key] !== '') {
        changeFormProp(key, value[key]);
      }
    }
    changeFormProp('totalCost', parseFloat(value['price']));

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
                  label='Add a bottle'
                  style={{ background: 'white' }}
                  variant='outlined'
                  required
                />
              </Fragment>
            )}
          />
        </Grid>
        <Grid item xs={4} style={{ margin: 'auto 0' }}>
          <Button
            variant='contained'
            type='submit'
            style={{ background: '#dfbfc7' }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default connect(null, { openBottleForm, changeFormProp })(
  AddBottleBySearch
);
