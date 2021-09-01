import React, { Fragment, useState } from 'react';
import AddBottleBySearch from './AddBottleBySearch';
import FormBottleDetails from './FormBottleDetails';

const TestForm = () => {
  const [formState, setFormState] = useState({
    step: 1,
    product: '',
    vintage: '',
    producer: '',
    region: '',
    country: '',
    varietal: '',
    style: '',
    sugar: '',
    bubbles: '',
    criticsScore: '',
    quantity: '',
    price: '',
    totalCost: '',
    costPerBottle: '',
    size: '',
    countryCode: '',
    status: 'unopened',
  });

  const {
    step,
    product,
    vintage,
    varietal,
    region,
    country,
    style,
    sugar,
    bubbles,
    criticsScore,
    quantity,
    price,
    totalCost,
    costPerBottle,
    size,
    countryCode,
    status,
  } = formState;

  const values = {
    step,
    product,
    vintage,
    varietal,
    region,
    country,
    style,
    sugar,
    bubbles,
    criticsScore,
    quantity,
    price,
    totalCost,
    costPerBottle,
    size,
    countryCode,
    status,
  };

  // Proceed to next step
  const nextStep = () => {
    setFormState({
      step: step + 1,
    });
  };

  // Return to previous step
  const prevStep = () => {
    setFormState({
      step: step - 1,
    });
  };

  // Handle fields change
  const handleChange = (input) => (e) => {
    setFormState({ ...formState, [input]: e.target.value });
  };

  return (
    <Fragment>
      {step === 1 ? (
        <AddBottleBySearch
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      ) : (
        <FormBottleDetails prevStep={prevStep} />
      )}
    </Fragment>
  );
};

export default TestForm;
