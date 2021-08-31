import React from 'react';
import '../../../data/flag-icon-css-master/css/flag-icon.css';

const CountryItem = ({ name, code }) => {
  return <option value={code}>{name}</option>;
};

export default CountryItem;
