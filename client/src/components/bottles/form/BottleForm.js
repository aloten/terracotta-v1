import React, { useState, useContext, useEffect } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import AlertContext from '../../../context/alert/AlertContext';
import CountryItem from './CountryItem';
import countryData from './data/country-codes';
import VarietalItem from './VarietalItem';
import varietalData from './data/wine-varietals';

const BottleForm = () => {
  const bottleContext = useContext(BottleContext);
  const { addBottle, updateBottle, current, clearCurrent } = bottleContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setBottle(current);
    } else {
      setBottle({
        product: '',
        vintage: '',
        varietal: '',
        count: '',
        price: '',
        totalCost: '',
        costPerBottle: '',
        size: '',
        countryCode: '',
        status: 'unopened',
      });
    }
  }, [bottleContext, current]);

  const [bottle, setBottle] = useState({
    product: '',
    vintage: '',
    varietal: '',
    count: '',
    price: '',
    totalCost: '',
    costPerBottle: '',
    size: '',
    countryCode: '',
    status: 'unopened',
  });

  const {
    product,
    vintage,
    varietal,
    count,
    price,
    totalCost,
    costPerBottle,
    size,
    countryCode,
    status,
  } = bottle;

  const onChange = (e) => {
    if (e.target.name === 'totalCost') {
      setBottle({
        ...bottle,
        totalCost: e.target.value,
        costPerBottle: e.target.value / count,
      });
    } else if (e.target.name === 'costPerBottle') {
      setBottle({
        ...bottle,
        costPerBottle: e.target.value,
        totalCost: e.target.value * count,
      });
    } else if (
      e.target.name === 'count' &&
      (costPerBottle > 0 || totalCost > 0)
    ) {
      if (costPerBottle > 0) {
        setBottle({
          ...bottle,
          count: e.target.value,
          totalCost: e.target.value * costPerBottle,
        });
      } else {
        setBottle({
          ...bottle,
          cost: e.target.value,
          costPerBottle: totalCost / e.target.value,
        });
      }
    } else {
      setBottle({ ...bottle, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (product === '') {
      setAlert('Product name required', 'dark');
    } else {
      if (vintage === '') {
        setBottle({ ...bottle, vintage: 'N/A' });
      }

      if (current !== null) {
        updateBottle(bottle);
      } else {
        addBottle(bottle);
      }
      clearCurrent();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Bottle' : 'Add Bottle'}</h2>
      <label htmlFor='product'>Product</label>
      <br></br>
      <input
        type='text'
        id='product'
        name='product'
        value={product}
        placeholder='Product'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='vintage'>Vintage</label>
      <br></br>
      <input
        // Need to make this a number
        type='text'
        id='vintage'
        name='vintage'
        value={vintage}
        placeholder='YYYY'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='price'>Price</label>
      <br></br>
      <input
        type='number'
        id='price'
        name='price'
        value={price}
        placeholder='Current price $'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='count'>Count</label>
      <br></br>
      <input
        type='number'
        id='count'
        name='count'
        value={count}
        placeholder='Count'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='size'>Size</label>
      <br></br>
      <input
        type='number'
        id='size'
        name='size'
        value={size}
        placeholder='Size in mL'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='totalCost'>Total cost</label>
      <br></br>
      <input
        type='number'
        id='totalCost'
        name='totalCost'
        value={totalCost}
        placeholder='Total cost $'
        onChange={onChange}
      />
      <br></br>
      <label htmlFor='costPerBottle'>Cost per bottle</label>
      <br></br>
      <input
        type='number'
        id='costPerBottle'
        name='costPerBottle'
        value={costPerBottle}
        placeholder='Cost per bottle $'
        onChange={onChange}
      />
      <select name='varietal' value={varietal} onChange={onChange}>
        <option value='' disabled>
          Please choose a varietal
        </option>
        {varietalData.map((key) => (
          <VarietalItem key={key} varietal={key} />
        ))}
      </select>
      <br></br>
      <select name='countryCode' value={countryCode} onChange={onChange}>
        <option value='' disabled>
          Please choose a country
        </option>
        {Object.keys(countryData).map((key) => (
          <CountryItem key={key} name={key} code={countryData[key]} />
        ))}
      </select>
      <input
        type='radio'
        name='status'
        value='unopened'
        checked={status === 'unopened'}
        onChange={onChange}
      />{' '}
      Unopened
      <input
        type='radio'
        name='status'
        value='opened'
        checked={status === 'opened'}
        onChange={onChange}
      />{' '}
      Opened
      <div>
        <input
          type='submit'
          value={current ? 'Update Bottle' : 'Add Bottle'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearCurrent}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default BottleForm;
