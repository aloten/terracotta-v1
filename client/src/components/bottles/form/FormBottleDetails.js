import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { changeFormProp } from '../../../actions/bottleActions';

import DateFnsUtils from '@date-io/date-fns';

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
    flex-direction: column;
  }

  input,
  textarea {
    padding: 0.1rem 0.3rem;
  }
`;

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
    <StyledFormBottleDetails>
      <form>
        <div className='form-group'>
          <label for='product'>Product</label>
          <input
            type='text'
            id='product'
            name='product'
            value={product}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <label for='vintage'>Vintage</label>

          <input
            type='text'
            id='vintage'
            name='vintage'
            value={vintage}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='producer'>Producer</label>
          <input
            type='text'
            id='producer'
            name='producer'
            value={producer}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='region'>Region</label>
          <input
            type='text'
            id='region'
            name='region'
            value={region}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='country'>Country</label>
          <input
            //change to AutoComplete
            type='text'
            id='country'
            name='country'
            value={country}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='varietal'>Varietal</label>
          <input
            //change to AutoComplete
            type='text'
            id='varietal'
            name='varietal'
            value={varietal}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='style'>Style</label>
          <input
            //change to AutoComplete
            type='text'
            id='style'
            name='style'
            value={style}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='sugar'>Sugar</label>
          <input
            //change to AutoComplete
            type='text'
            id='sugar'
            name='sugar'
            value={sugar}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='bubbles'>Bubbles</label>
          <input
            //change to AutoComplete
            type='text'
            id='bubbles'
            name='bubbles'
            value={bubbles}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='quantity'>Quantity</label>
          <input
            type='number'
            id='quantity'
            name='quantity'
            value={quantity}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='currency'>Currency</label>
          <select
            // TO DO
            name='currency'
            id='currency'
            value={currency}
            id=''
            onChange={(e) => handleChange(e)}
          >
            <option value='$'>$</option>
            <option value='&yen;'>&yen;</option>
          </select>
        </div>
        <div className='form-group'>
          <label for='price'>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            value={price}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='totalCost'>Total cost</label>
          <input
            type='number'
            id='totalCost'
            name='totalCost'
            value={totalCost}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='size'>Bottle size</label>
          <input
            type='text'
            id='size'
            name='size'
            value={size}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='alcoholPct'>Alc %</label>
          <input
            type='text'
            id='alcoholPct'
            name='alcoholPct'
            value={alcoholPct}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='vendor'>Vendor</label>
          <input
            type='text'
            id='vendor'
            name='vendor'
            value={vendor}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='location'>Location</label>
          <input
            type='text'
            id='location'
            name='location'
            value={location}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='datePurchased'>Date purchased</label>
          <input
            type='date'
            id='datePurchased'
            name='datePurchased'
            value={datePurchased}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='dateReceived'>Date received</label>
          <input
            type='date'
            id='dateReceived'
            name='dateReceived'
            value={dateReceived}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='criticsScore'>Critic scores</label>
          <input
            type='text'
            id='criticsScore'
            name='criticsScore'
            value={criticsScore}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='opened'>Opened</label>
          <input
            type='radio'
            id='opened'
            name='opened'
            value={true}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='unopened'>Unopened</label>
          <input
            type='radio'
            id='opened'
            name='opened'
            value={false}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className='form-group'>
          <label for='notes'>Notes</label>
          <textarea
            id='notes'
            name='notes'
            value={notes}
            onChange={(e) => handleChange(e)}
          />
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

export default connect(mapStateToProps, {
  changeFormProp,
})(FormBottleDetails);
