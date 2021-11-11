import React from 'react';
import { connect } from 'react-redux';
import { openBottleForm, changeFormProp } from '../../../actions/bottleActions';
import AutoComplete from './AutoComplete';
import uniqueProductNames from '../../../data/uniqueProductNamesSmall.json';

const AddBottleBySearch = ({ openBottleForm, changeFormProp }) => {
  return <AutoComplete options={uniqueProductNames} />;
};

export default connect(null, { openBottleForm, changeFormProp })(
  AddBottleBySearch
);
