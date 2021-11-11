import React from 'react';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';
import AutoComplete from './AutoComplete';
import uniqueBottles from '../../../data/uniqueBottlesSmall.json';

const AddBottleBySearch = ({ openBottleForm, changeFormProp }) => {
  return <AutoComplete options={['pear', 'peach', 'apple']} />;
};

export default connect(null, { openBottleForm, changeFormProp })(
  AddBottleBySearch
);
