import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';
import AutoCompleteTrie from './AutoCompleteTrie';

import { ProductTrie } from '../../../dataStructures/ProductTrie';
import uniqueProductNames from '../../../data/uniqueProductNames.json';
import uniqueBottles from '../../../data/uniqueBottles.json';

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
  // Build up productTrie based on keys, values in uniqueDict
  // uniqueDict keys correspond to unique product words
  // uniqueDict values correspond to uniqueProductNames.json indices
  //
  // e.g. If "Yellow Tail Shiraz" product name has index of 100 in uniqueProductNames.json
  // trie node sequences of "y", "ye", "yel"... "yellow" for EACH WORD SEPERATELY
  // each node "y", "e", "l" ... would have an indices array property which includes 100
  // so in "y-e-l-l-o-w" node sequence, the ProductNode "w" would have 100 in its indices property
  // and this component accesses uniqueProductNames[100] to list as an option for the user
  const [productTrie, setProductTrie] = useState();

  useEffect(() => {
    const trie = new ProductTrie();
    for (const name of uniqueProductNames) {
      trie.addSequence(name);
    }
    setProductTrie(trie);
  }, []);

  const searchTrie = (searchStr) => {
    return productTrie.getOptions(searchStr);
  };

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
        <AutoCompleteTrie
          placeholderText='Search for wine to add'
          required={true}
          name='product'
          searchTrie={searchTrie}
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
