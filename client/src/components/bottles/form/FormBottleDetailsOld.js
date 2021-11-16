import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeFormProp } from '../../../actions/bottleActions';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import Autocomplete from '@material-ui/lab/Autocomplete';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import countries from '../../../data/countries.json';
import varietals from '../../../data/varietals';
import currencies from '../../../data/currencies';

const FormBottleDetails = ({ bottleState: { bottleForm }, changeFormProp }) => {
  const {
    product,
    vintage,
    producer,
    varietal,
    region,
    country,
    style,
    sugar,
    bubbles,
    criticsScore,
    quantity,
    currency,
    price,
    totalCost,
    size,
    alcoholPct,
    vendor,
    location,
    notes,
    opened,
    datePurchased,
    dateReceived,
  } = bottleForm;

  const handleChange = (e) => {
    if (
      e.target.name === 'price' ||
      e.target.name === 'totalCost' ||
      e.target.name === 'quantity'
    ) {
      handlePriceCalc(e);
    } else if (e.target.name === 'opened') {
      changeFormProp(e.target.name, e.target.checked);
    } else {
      changeFormProp(e.target.name, e.target.value);
    }
  };

  // Dynamically update price, quantity, and total cost
  const handlePriceCalc = (e) => {
    if (e.target.name === 'totalCost') {
      changeFormProp('totalCost', parseFloat(e.target.value));
      changeFormProp('price', parseFloat(e.target.value) / quantity);
    } else if (e.target.name === 'price') {
      changeFormProp('price', parseFloat(e.target.value));
      changeFormProp('totalCost', parseFloat(e.target.value) * quantity);
    } else if (e.target.name === 'quantity') {
      changeFormProp('quantity', parseFloat(e.target.value));
      if (price > 0) {
        changeFormProp('totalCost', parseFloat(e.target.value) * price);
      } else if (totalCost > 0) {
        changeFormProp('price', totalCost / parseFloat(e.target.value));
      }
    }
  };

  const datePurchasedChange = (date) => {
    changeFormProp('datePurchased', date);
  };

  const dateReceivedChange = (date) => {
    changeFormProp('dateReceived', date);
  };

  const countryToFlag = (isoCode) => {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;
  };

  const styleOptions = [
    'Red',
    'White',
    'Sparkling',
    'Dessert',
    'Spirit',
    'Liquer',
    'White Vermouth',
    'Red Vermouth',
    'Brandy',
    'Rose',
    'Gin',
    'Port',
    'Whisky',
    'Fruit Liqueur',
    'Cider',
    'Rum',
    'Apple',
    'Beer',
    'Aperitif',
    'Vermouth',
  ];

  const sugarOptions = [
    'Dry',
    'Brut',
    'Sweet',
    'Medium Dry',
    'Medium',
    'Bitter',
  ];

  const bubbleOptions = ['Still', 'Sparkling', 'Nouveau'];

  return (
    <form>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id='product-TextF'
            name='product'
            value={product}
            onChange={(e) => handleChange(e)}
            label='Product Name'
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='vintage-TextF'
            name='vintage'
            value={vintage}
            onChange={(e) => handleChange(e)}
            label='Vintage'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='producer-TextF'
            label='Producer'
            name='producer'
            value={producer}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='standard-basic'
            name='region'
            value={region}
            onChange={(e) => handleChange(e)}
            label='Region'
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='country-autoC'
            name='country'
            value={country}
            onChange={(event, newValue) => {
              changeFormProp('country', newValue);
            }}
            options={countries}
            getOptionSelected={(option, value) => option.code === value.code}
            getOptionLabel={(option) => option.name}
            renderOption={(option) => (
              <Fragment>
                <span>{countryToFlag(option.code)}</span>
                {option.name} ({option.code})
              </Fragment>
            )}
            renderInput={(params) => <TextField {...params} label='Country' />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='varietal-autoC'
            name='varietal'
            value={varietal}
            onChange={(event, newValue) => {
              changeFormProp('varietal', newValue);
            }}
            options={varietals}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label='Varietal' />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='style-autoC'
            name='style'
            value={style}
            onChange={(event, newValue) => {
              changeFormProp('style', newValue);
            }}
            options={styleOptions}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label='Style' />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='sugar-autoC'
            name='sugar'
            value={sugar}
            onChange={(event, newValue) => {
              changeFormProp('sugar', newValue);
            }}
            options={sugarOptions}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label='Sugar' />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id='bubbles-autoC'
            name='bubbles'
            value={bubbles}
            onChange={(event, newValue) => {
              changeFormProp('bubbles', newValue);
            }}
            options={bubbleOptions}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label='Bubbles' />}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='standard-basic'
            name='quantity'
            value={quantity}
            onChange={(e) => handleChange(e)}
            label='Quantity'
            type='number'
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='standard-basic'
            name='currency'
            value={currency}
            onChange={(e) => handleChange(e)}
            label='Currency'
            select
            fullWidth
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='standard-basic'
            name='price'
            value={isNaN(price) ? '' : price}
            onChange={(e) => handleChange(e)}
            label='Price'
            type='number'
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='standard-basic'
            name='totalCost'
            value={isNaN(totalCost) ? '' : totalCost}
            onChange={(e) => handleChange(e)}
            label='Total Cost'
            type='number'
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id='standard-basic'
            name='size'
            value={size}
            onChange={(e) => handleChange(e)}
            label='Bottle size'
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label='Alc %'
            name='alcoholPct'
            value={alcoholPct}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id='standard-basic'
            name='vendor'
            value={vendor}
            onChange={(e) => handleChange(e)}
            label='Vendor'
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            id='standard-basic'
            name='location'
            value={location}
            onChange={(e) => handleChange(e)}
            label='Location'
          />
        </Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date Purchased'
              name='datePurchased'
              value={datePurchased}
              onChange={datePurchasedChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/dd/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date Received'
              name='dateReceived'
              value={dateReceived}
              onChange={dateReceivedChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid item xs={6}>
          <TextField
            id='standard-basic'
            label='Critic Scores'
            value={criticsScore}
            name='criticsScore'
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={opened}
                onChange={handleChange}
                name='opened'
                color='primary'
              />
            }
            label={opened ? 'Opened' : 'Unopened'}
          />
        </Grid>
        <Grid item xs={12} />
        <Grid item xs={12}>
          <TextField
            id='outlined-multiline-static'
            label='Notes'
            value={notes}
            multiline
            rows={4}
            variant='outlined'
            fullWidth
          />
        </Grid>
      </Grid>
    </form>
  );
};

FormBottleDetails.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps, {
  changeFormProp,
})(FormBottleDetails);