import React from 'react';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';
import AutoComplete from './AutoComplete';
import uniqueProductNames from '../../../data/uniqueProductNamesSmall.json';
import uniqueBottles from '../../../data/uniqueBottlesSmall.json';

const AddBottleBySearch = ({ openBottleForm, changeFormProp }) => {
  const onContinue = (e) => {
    e.preventDefault();
    const userInput = e.target.product.value;

    if (userInput === '') {
      return;
    }
    for (const bottle of uniqueBottles) {
      if (bottle.product === userInput) {
        for (const key in bottle) {
          if (key === 'country') {
            changeFormProp(key, bottle[key].code);
          } else {
            changeFormProp(key, bottle[key]);
          }
        }
        if (bottle['price']) {
          changeFormProp('totalCost', parseFloat(bottle['price']));
        } else {
          changeFormProp('price', 0);
        }
        openBottleForm();
        return;
      }
    }
    changeFormProp('product', userInput);
    openBottleForm();
  };
  return (
    <>
      <form className='form' onSubmit={onContinue}>
        <AutoComplete
          options={uniqueProductNames}
          placeholderText='Search for wine to add'
          required={true}
          name='product'
        />
        <input
          type='submit'
          value='Continue'
          className='btn btn-primary search-btn'
        />
      </form>
    </>
  );
};

export default connect(null, { openBottleForm, changeFormProp })(
  AddBottleBySearch
);
