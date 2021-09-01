import React, { Fragment, useContext, useState } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import uniqueBottles from '../../../data/uniqueBottlesSmall.json';

const AddBottleBySearch = ({ nextStep, handleChange, values }) => {
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onContinue = (e) => {
    e.preventDefault();
    nextStep();
  };

  const onChange = (newValue) => {};

  return (
    <Fragment>
      <Autocomplete
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

            <Button variant='contained' onClick={onContinue}>
              Continue
            </Button>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default AddBottleBySearch;
