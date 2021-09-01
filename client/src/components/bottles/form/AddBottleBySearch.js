import React, { useContext, useState } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import uniqueBottles from '../../../data/uniqueBottlesSmall.json';

const AddBottleBySearch = () => {
  const bottleContext = useContext(BottleContext);
  const { setCurrent, addBottle } = bottleContext;

  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const onSubmit = () => {
    if (value !== '') {
    }
    // need to handle input value when no product matches/exists
  };

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          setCurrent(newValue); // setCurrent again to capture _id in form after POST req in BottleState.js
          addBottle(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        style={{ padding: '10px' }}
        options={uniqueBottles}
        getOptionLabel={(option) => option.product}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search for a bottle'
            variant='outlined'
          />
        )}
      />
      <div>
        <button onClick={onSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddBottleBySearch;
