import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AutoComplete from './AutoComplete';

import countries from '../../../data/countries.json';
import varietals from '../../../data/varietals';
import currencies from '../../../data/currencies';

const StyledFormBottleDetails = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group {
    display: flex;
    gap: 1rem;
  }

  .label-group {
    width: 3rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  input[type='text'],
  input[type='number'],
  textarea,
  select {
    padding: 0.1rem 0.3rem;
  }

  input[type='checkbox'] {
    height: 1.5rem;
    width: 1.5rem;
  }

  .producer-group {
    flex-grow: 10;
  }

  .quantity-group {
    flex-grow: 4;
  }

  .price-group {
    flex-grow: 4;
  }

  .totalCost-group {
    flex-grow: 8;
  }

  .opened-group {
    align-items: center;
  }

  .btn-group {
    justify-content: flex-end;
  }
`;

const FormBottleDetails = ({
  bottleState: { bottleForm },
  onSubmit,
  handleClose,
}) => {
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

  const isoToName = (isoCode) => {
    if (isoCode === '') {
      return '';
    }
    for (const country of countries) {
      if (country.code === isoCode) {
        return country.name;
      }
    }
    return isoCode;
  };

  const [formState, setFormState] = useState({
    product,
    vintage,
    producer,
    varietal,
    region,
    country: isoToName(country),
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
    datePurchased:
      datePurchased !== null ? datePurchased.slice(0, 10) : datePurchased,
    dateReceived:
      dateReceived !== null ? dateReceived.slice(0, 10) : dateReceived,
  });

  const handleChange = (e) => {
    if (
      e.target.name === 'price' ||
      e.target.name === 'totalCost' ||
      e.target.name === 'quantity'
    ) {
      handlePriceCalc(e);
    } else if (e.target.name === 'opened') {
      setFormState({ ...formState, [e.target.name]: e.target.checked });
    } else if (e.target.name === 'country') {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  // Dynamically update price, quantity, and total cost
  const handlePriceCalc = (e) => {
    if (e.target.name === 'totalCost') {
      setFormState({
        ...formState,
        totalCost: parseFloat(e.target.value),
        price: parseFloat(e.target.value) / formState.quantity,
      });
    } else if (e.target.name === 'price') {
      setFormState({
        ...formState,
        price: parseFloat(e.target.value),
        totalCost: parseFloat(e.target.value) * formState.quantity,
      });
    } else if (e.target.name === 'quantity') {
      if (formState.price > 0) {
        setFormState({
          ...formState,
          quantity: parseFloat(e.target.value),
          totalCost: parseFloat(e.target.value) * formState.price,
        });
      } else if (formState.totalCost > 0) {
        setFormState({
          ...formState,
          quantity: parseFloat(e.target.value),
          price: parseFloat(e.target.value),
        });
      } else {
        setFormState({
          ...formState,
          quantity: parseFloat(e.target.value),
        });
      }
    }
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
    <StyledFormBottleDetails>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <div className='label-group'>
            <label htmlFor='product'>Product</label>
            <input
              type='text'
              id='product'
              name='product'
              value={formState.product}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='label-group vintage-group'>
            <label htmlFor='vintage'>Vintage</label>
            <input
              type='text'
              id='vintage'
              name='vintage'
              value={formState.vintage}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group producer-group'>
            <label htmlFor='producer'>Producer</label>
            <input
              type='text'
              id='producer'
              name='producer'
              value={formState.producer}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='label-group'>
            <label htmlFor='region'>Region</label>
            <input
              type='text'
              id='region'
              name='region'
              value={formState.region}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='label-group'>
            <label htmlFor='country'>Country</label>
            <AutoComplete
              options={countries.map((country) => {
                return country.name;
              })}
              id='country'
              name='country'
              value={formState.country}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='label-group'>
            <label htmlFor='varietal'>Varietal</label>
            <AutoComplete
              options={varietals}
              id='varietal'
              name='varietal'
              value={formState.varietal}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group'>
            <label htmlFor='style'>Style</label>
            <AutoComplete
              options={styleOptions}
              id='style'
              name='style'
              value={formState.style}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group'>
            <label htmlFor='sugar'>Sugar</label>
            <AutoComplete
              options={sugarOptions}
              id='sugar'
              name='sugar'
              value={formState.sugar}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group'>
            <label htmlFor='bubbles'>Bubbles</label>
            <AutoComplete
              options={bubbleOptions}
              id='bubbles'
              name='bubbles'
              value={formState.bubbles}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group quantity-group'>
            <label htmlFor='quantity'>Quantity</label>
            <input
              type='number'
              id='quantity'
              name='quantity'
              value={formState.quantity}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group currency-group'>
            <label htmlFor='currency'>Currency</label>
            <select
              name='currency'
              id='currency'
              value={formState.currency}
              onChange={(e) => handleChange(e)}
            >
              {currencies.map((currency) => (
                <option key={currency.label} value={currency.value}>
                  {currency.label}
                </option>
              ))}
            </select>
          </div>
          <div className='label-group price-group'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={formState.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group totalCost-group'>
            <label htmlFor='totalCost'>Total cost</label>
            <input
              type='number'
              id='totalCost'
              name='totalCost'
              value={formState.totalCost}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='form-group'>
          <div className='label-group size-group'>
            <label htmlFor='size'>Bottle size</label>
            <input
              type='text'
              id='size'
              name='size'
              value={formState.size}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group alcoholPct-group'>
            <label htmlFor='alcoholPct'>Alc %</label>
            <input
              type='text'
              id='alcoholPct'
              name='alcoholPct'
              value={formState.alcoholPct}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group vendor-group'>
            <label htmlFor='vendor'>Vendor</label>
            <input
              type='text'
              id='vendor'
              name='vendor'
              value={formState.vendor}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group location-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              id='location'
              name='location'
              value={formState.location}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group datePurchased-group'>
            <label htmlFor='datePurchased'>Date purchased</label>
            <input
              type='date'
              id='datePurchased'
              name='datePurchased'
              value={formState.datePurchased || ''}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group dateReceived-group'>
            <label htmlFor='dateReceived'>Date received</label>
            <input
              type='date'
              id='dateReceived'
              name='dateReceived'
              value={formState.dateReceived || ''}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group criticsScore-group'>
            <label htmlFor='criticsScore'>Critic scores</label>
            <input
              type='text'
              id='criticsScore'
              name='criticsScore'
              value={formState.criticsScore}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='label-group opened-group'>
            <label htmlFor='opened'>Opened</label>
            <input
              type='checkbox'
              id='opened'
              name='opened'
              checked={formState.opened}
              value={formState.opened}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='form-group'>
          <div className='label-group notes-group'>
            <label htmlFor='notes'>Notes</label>
            <textarea
              id='notes'
              name='notes'
              value={formState.notes}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='form-group btn-group'>
          <button onClick={handleClose} className='btn btn-danger'>
            Cancel
          </button>
          <input type='submit' value='Save' className='btn btn-success' />
        </div>
      </form>
    </StyledFormBottleDetails>
  );
};

FormBottleDetails.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps)(FormBottleDetails);
