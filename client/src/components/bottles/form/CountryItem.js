import React from 'react';

const CountryItem = ({ name, code }) => {
  return <option value={code}>{name}</option>;
};

export default CountryItem;
