import React, { useContext } from 'react';
import './flag-icon-css-master/flag-icon-css-master/css/flag-icon.css';
import BottleContext from '../../context/bottles/BottleContext';
import PropTypes from 'prop-types';
const countryData = require('./form/data/country-codes');

const BottleItem = ({ bottle }) => {
  const bottleContext = useContext(BottleContext);

  const { setCurrent, clearCurrent, deleteBottle } = bottleContext;

  const {
    _id,
    product,
    vintage,
    varietal,
    count,
    price,
    costPerBottle,
    totalCost,
    size,
    countryCode,
    status,
  } = bottle;

  const onEdit = () => {
    setCurrent(bottle);
  };

  const onDelete = () => {
    deleteBottle(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {product}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (status === 'unopened' ? 'badge-success' : 'badge-primary')
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {vintage && (
          <li>
            <strong>Vintage:</strong> {vintage}
          </li>
        )}
        {countryCode && (
          <li>
            <i
              className={'flag-icon flag-icon-' + countryCode.toLowerCase()}
            ></i>{' '}
            {Object.keys(countryData).map(
              (key) => countryData[key] === countryCode && key
            )}
          </li>
        )}
        {varietal && (
          <li>
            <strong>Varietal:</strong> {varietal}
          </li>
        )}
        {price && (
          <li>
            <strong>Price per bottle:</strong> ${price}
          </li>
        )}
        {costPerBottle && (
          <li>
            <strong>Cost per bottle:</strong> ${costPerBottle}
          </li>
        )}
        {size && (
          <li>
            <strong>Bottle size:</strong> {size}mL
          </li>
        )}
        {costPerBottle && price && (
          <li>
            <strong>Book return:</strong> {(price / costPerBottle) * 100}%
          </li>
        )}
        {count && (
          <li>
            <strong>Count:</strong> {count}
          </li>
        )}
        {totalCost && (
          <li>
            <strong>Total cost:</strong> ${totalCost}
          </li>
        )}
        {count && price && (
          <li>
            <strong>Total value:</strong> ${count * price}
          </li>
        )}
        {count && price && (
          <li>
            <strong>Book profit/loss:</strong> ${price * count - totalCost}
          </li>
        )}
      </ul>
      <button className='btn btn-dark btn-sm' onClick={onEdit}>
        Edit
      </button>
      <button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

BottleItem.propTypes = {
  bottle: PropTypes.object.isRequired,
};

export default BottleItem;
