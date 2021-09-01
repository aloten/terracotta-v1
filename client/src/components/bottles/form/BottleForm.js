import React, { useState, useContext, useEffect } from 'react';
import BottleContext from '../../../context/bottles/BottleContext';
import AlertContext from '../../../context/alert/AlertContext';
import CountryItem from './CountryItem';
import countryData from './data/country-codes';
import VarietalItem from './VarietalItem';
import varietalData from './data/wine-varietals';
import { range } from '../../../utils/arrays';

const BottleForm = () => {
  const bottleContext = useContext(BottleContext);
  const { addBottle, updateBottle, current, clearCurrent } = bottleContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const currentYear = new Date().getFullYear();

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
      <label htmlFor='product'>Product name</label>
      <input
        type='text'
        id='product'
        name='product'
        value={product}
        placeholder='Product'
        onChange={onChange}
        required
      />
      <label htmlFor='vintage'>Vintage</label>
      <input
        // Need to make this a number
        type='number'
        max={currentYear + 1}
        min={300}
        step={1}
        id='vintage'
        name='vintage'
        value={vintage}
        placeholder='YYYY'
        onChange={onChange}
        list="defaultYears"
        style={{width: '5em'}}
      />
      <datalist id="defaultYears">
      {range(currentYear-50, currentYear, 1).map(y => <option key={y} value={y} />).reverse()}
      </datalist>
      <label htmlFor='price'>Price (USD)</label>
      <input
        type='number'
        min={0}
        step={0.01}
        id='price'
        name='price'
        value={price}
        placeholder='Current price $'
        onChange={onChange}
      />
      <label htmlFor='count'>Count</label>
      <input
        type='number'
        id='count'
        min={0}
        step={1}
        name='count'
        value={count}
        placeholder='Count'
        onChange={onChange}
      />
      <label htmlFor='size'>Size (ml)</label>
      <input
        type='number'
        id='size'
        name='size'
        value={size}
        placeholder='Size in ml'
        onChange={onChange}
        list="defaultSizes"
      />
      <datalist id="defaultSizes">
        <option key={375} value={375}>375 ml (Demi/Half)</option>
        <option key={750} value={750}>750 ml (Standard)</option>
        <option key={1500} value={1500}>1.5 L (Magnum)</option>
        <option key={3000} value={3000}>3.0 L (Double Magnum)</option>
        <option key={4500} value={4500}>4.5 L (Jeroboam/Rehoboam)</option>
        <option key={6000} value={6000}>6.0 L (Imperial/Methuselah)</option>
        <option key={9000} value={9000}>9.0 L (Salmanazar)</option>
        <option key={12000} value={12000}>12.0 L (Bathazar)</option>
        <option key={15000} value={15000}>15.0 L (Nebuchadnezzar)</option>
        <option key={18000} value={18000}>18.0 L (Solomon/Melchior)</option>
      </datalist>
      <label htmlFor='totalCost'>Total cost (USD)</label>
      <input
        type='number'
        id='totalCost'
        name='totalCost'
        value={totalCost}
        placeholder='Total cost $'
        onChange={onChange}
      />
      <label htmlFor='costPerBottle'>Cost per bottle (USD)</label>
      <input
        type='number'
        id='costPerBottle'
        name='costPerBottle'
        value={costPerBottle}
        placeholder='Cost per bottle $'
        onChange={onChange}
      />
      <label htmlFor='varietal'>Varietal</label>
      <select name='varietal' value={varietal} onChange={onChange}>
        <option value='' disabled>
          Please choose a varietal
        </option>
        {varietalData.map((key) => (
          <VarietalItem key={key} varietal={key} />
        ))}
      </select>
      <label htmlFor='countryCode'>Country of origin</label>
      <select name='countryCode' value={countryCode} onChange={onChange}>
        <option value='' disabled>
          Please choose a country
        </option>
        <optgroup label="Common wine producers">
          <option key="C-IT" value="IT">Italy</option>
          <option key="C-FR" value="FR">France</option>
          <option key="C-ES" value="ES">Spain</option>
          <option key="C-US" value="US">United States</option>
          <option key="C-AR" value="AR">Argentina</option>
          <option key="C-CL" value="CL">Chile</option>
          <option key="C-AU" value="AU">Australia</option>
          <option key="C-CN" value="CN">China</option>
          <option key="C-DE" value="DE">Germany</option>
          <option key="C-ZA" value="ZA">South Africa</option>
          <option key="C-PT" value="PT">Portugal</option>
        </optgroup>
        <optgroup label="All countries">
          {Object.keys(countryData).map((key) => (
            <CountryItem key={key} name={key} code={countryData[key]} />
          ))}
        </optgroup>
      </select>
      <fieldset className="radiogroup">
        <legend>Bottle status</legend>
        <input
          type='radio'
          name='status'
          id='status-unopened'
          value='unopened'
          checked={status === 'unopened'}
          onChange={onChange}
        />
        <label htmlFor='status-unopened'>Unopened</label>
        <input
          type='radio'
          name='status'
          id='status-opened'
          value='opened'
          checked={status === 'opened'}
          onChange={onChange}
        />
        <label htmlFor='status-opened'>Opened</label>
      </fieldset>
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
