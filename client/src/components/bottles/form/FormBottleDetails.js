import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import CountryItem from './CountryItem';
// import countryData from '../../../data/country-codes';
// import VarietalItem from './VarietalItem';
// import varietalData from '../../../data/varietals';

const FormBottleDetails = ({ prevStep }) => {
  const onBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  return (
    <form>
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
      <Button variant='contained' onClick={onBack}>
        Back
      </Button>
    </form>
  );
};

export default FormBottleDetails;
