import React, { useContext, Fragment } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';

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

const FormBottleDetails = () => {
  const bottleContext = useContext(BottleContext);
  const { bottleForm, changeForm } = bottleContext;

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
      changeForm(e.target.name, e.target.checked);
    } else {
      changeForm(e.target.name, e.target.value);
    }
  };

  // Dynamically update price, quantity, and total cost
  const handlePriceCalc = (e) => {
    if (e.target.name === 'totalCost') {
      changeForm('totalCost', parseFloat(e.target.value));
      changeForm('price', parseFloat(e.target.value) / quantity);
    } else if (e.target.name === 'price') {
      changeForm('price', parseFloat(e.target.value));
      changeForm('totalCost', parseFloat(e.target.value) * quantity);
    } else if (e.target.name === 'quantity' && (price > 0 || totalCost > 0)) {
      if (price > 0) {
        changeForm('quantity', parseFloat(e.target.value));
        changeForm('totalCost', parseFloat(e.target.value) * price);
      } else {
        changeForm('totalCost', parseFloat(e.target.value));
        changeForm('price', totalCost / parseFloat(e.target.value));
      }
    }
  };

  const datePurchasedChange = (date) => {
    changeForm('datePurchased', date);
  };

  const dateReceivedChange = (date) => {
    changeForm('dateReceived', date);
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

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'GBP',
      label: '£',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
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
              changeForm('country', newValue);
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
              changeForm('varietal', newValue);
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
              changeForm('style', newValue);
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
              changeForm('sugar', newValue);
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
              changeForm('bubbles', newValue);
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
            value={price}
            onChange={(e) => handleChange(e)}
            label='Price'
            type='number'
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id='standard-basic'
            name='totalCost'
            value={totalCost}
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

export default FormBottleDetails;
