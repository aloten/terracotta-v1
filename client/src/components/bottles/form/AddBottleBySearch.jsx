import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';
import AutoComplete from './AutoComplete';
import { ProductTrie } from '../../../dataStructures/ProductTrie';
import uniqueDict from '../../../data/uniqueDict.json';
import uniqueProductNames from '../../../data/uniqueProductNames.json';
// import uniqueProductNames from '../../../data/uniqueProductNamesSmall.json';
// import uniqueBottles from '../../../data/uniqueBottlesSmall.json';

const StyledAddBottleBySearch = styled.div`
  .form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    gap: 1rem;
  }

  .form input {
    grid-column: 2;
  }
`;

const AddBottleBySearch = ({ openBottleForm, changeFormProp }) => {
  const productTrie = new ProductTrie();
  for (const key in uniqueDict) {
    productTrie.addSequence(key.toLowerCase(), uniqueDict[key]);
  }

  // TO DO search trie with input text and get array indices

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
    <StyledAddBottleBySearch>
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
    </StyledAddBottleBySearch>
  );
};

export default connect(null, { openBottleForm, changeFormProp })(
  AddBottleBySearch
);
