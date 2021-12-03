import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
  loadCellarStats,
} from '../../actions/bottleActions';

import currencies from '../../data/currencies';

const StyledInventory = styled.div`
  /* Not mobile first design */
  .inventory-table {
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.24);
    border-radius: 5px;
    border-collapse: collapse;
    width: 100%;
    background: white;
    overflow-x: scroll;
  }

  tr {
    border-bottom: 1px solid lightgray;
  }

  th,
  td {
    padding: 0.5rem;
  }

  th {
    text-align: left;
    font-weight: normal;
  }

  th.actions {
    width: 4%;
  }

  th.vintage {
    width: 4%;
  }

  .actions-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: end;
  }

  @media (max-width: 768px) {
    thead {
      display: none;
    }

    td {
      display: flex;
      border-bottom: 1px solid #ddd;
    }

    .actions-wrapper {
      width: 20%;
    }

    tr {
      border-bottom: 5px solid ${(props) => props.theme.colors.bgGrey};
    }

    td::before {
      content: attr(label);
      font-weight: bold;
      width: 120px;
      min-width: 120px;
    }
  }
`;

const Inventory = ({
  bottleState: { bottles },
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
  loadCellarStats,
}) => {
  useEffect(() => {
    getBottles().then(() => {
      loadCellarStats();
    });
    // eslint-disable-next-line
  }, []);

  const onEdit = (e, id) => {
    e.preventDefault();
    for (const bottle of bottles) {
      if (bottle._id === id) {
        for (const prop in bottle) {
          changeFormProp(prop, bottle[prop]);
        }
        openBottleForm();
        return;
      }
    }
  };

  const onDelete = (e, id) => {
    e.preventDefault();
    deleteBottle(id);
  };

  return (
    <StyledInventory>
      <table className='inventory-table'>
        <thead>
          <tr>
            <th className='actions'></th>
            <th className='vintage'>Vintage</th>
            <th className='product'>Product</th>
            <th className='quantity'>Quantity</th>
            <th className='price'>Price</th>
            <th className='totalCost'>Total cost</th>
            <th className='datePurchased'>Date Purchased</th>
            <th className='dateReceived'>Date Received</th>
            <th className='dateAdded'>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {bottles &&
            bottles.map((bottle) => (
              <tr key={bottle._id}>
                <td label=''>
                  <div className='actions-wrapper'>
                    <i
                      className='fas fa-edit icon-neutral'
                      onClick={(e) => onEdit(e, bottle._id)}
                      title='edit'
                    ></i>
                    <i
                      className='fas fa-trash icon-danger'
                      onClick={(e) => onDelete(e, bottle._id)}
                      title='delete'
                    ></i>
                  </div>
                </td>
                <td label='Vintage'>{bottle.vintage}</td>
                <td label='Product'>{bottle.product}</td>
                <td label='Quantity'>{bottle.quantity}</td>
                <td label='Price'>
                  {bottle.price &&
                    currencies.filter((currency) => {
                      if (bottle.currency === currency.value) {
                        return currency;
                      }
                    })[0].label}
                  {bottle.price}
                </td>
                <td label='Total cost'>
                  {bottle.price &&
                    currencies.filter((currency) => {
                      if (bottle.currency === currency.value) {
                        return currency;
                      }
                    })[0].label}
                  {bottle.totalCost}
                </td>
                <td label='Date purchased'>
                  {bottle.datePurchased && bottle.datePurchased.slice(0, 10)}
                </td>
                <td label='Date received'>
                  {bottle.dateReceived && bottle.dateReceived.slice(0, 10)}
                </td>
                <td label='Date added'>
                  {bottle.dateAdded && bottle.dateAdded.slice(0, 10)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </StyledInventory>
  );
};

Inventory.propTypes = {
  bottleState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  bottleState: state.bottleState,
});

export default connect(mapStateToProps, {
  deleteBottle,
  getBottles,
  changeFormProp,
  openBottleForm,
  loadCellarStats,
})(Inventory);
