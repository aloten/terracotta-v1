import React, { useContext } from 'react';
import '../../data/flag-icon-css-master/css/flag-icon.css';
import BottleContext from '../../context/bottles/BottleContext';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const BottleItem = ({ bottle }) => {
  const bottleContext = useContext(BottleContext);

  const { deleteBottle, changeForm, clearForm, nextStep } = bottleContext;

  const {
    _id,
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
  } = bottle;

  const onEdit = () => {
    for (const key in bottle) {
      changeForm(key, bottle[key]);
    }
    nextStep();
  };

  const onDelete = () => {
    deleteBottle(_id);
    clearForm();
  };

  return (
    <div>
      {'---------------------------------'}
      {_id && <div>{_id}</div>}
      {product && <div>{product}</div>}
      {vintage && <div>{vintage}</div>}
      {producer && <div>{producer}</div>}
      {varietal && <div>{varietal}</div>}
      {region && <div>{region}</div>}
      {country && <div>{country.name}</div>}
      {style && <div>{style}</div>}
      {sugar && <div>{sugar}</div>}
      {bubbles && <div>{bubbles}</div>}
      {criticsScore && <div>{criticsScore}</div>}
      {quantity && <div>{quantity}</div>}
      {currency && <div>{currency}</div>}
      {price && <div>{price}</div>}
      {totalCost && <div>{totalCost}</div>}
      {size && <div>{size}</div>}
      {alcoholPct && <div>{alcoholPct}</div>}
      {vendor && <div>{vendor}</div>}
      {location && <div>{location}</div>}
      {notes && <div>{product}</div>}
      {opened && <div>{opened}</div>}
      {datePurchased && <div>{datePurchased}</div>}
      {dateReceived && <div>{dateReceived}</div>}
      <Button variant='contained' onClick={onDelete}>
        Delete
      </Button>
      <Button variant='contained' onClick={onEdit}>
        Edit
      </Button>
      {'---------------------------------'}
    </div>
  );
};

BottleItem.propTypes = {
  bottle: PropTypes.object.isRequired,
};

export default BottleItem;
