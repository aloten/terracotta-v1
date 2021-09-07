import React, { useReducer } from 'react';
import BottleContext from './BottleContext';
import BottleReducer from './BottleReducer';
import {
  GET_BOTTLES,
  ADD_BOTTLE,
  UPDATE_BOTTLE,
  DELETE_BOTTLE,
  BOTTLE_ERROR,
  CLEAR_BOTTLES,
  FILTER_BOTTLES,
  CLEAR_FILTER,
  NEXT_STEP,
  PREV_STEP,
  CHANGE_FORM,
  CLEAR_FORM,
} from '../types';
import axios from 'axios';

const BottleState = (props) => {
  const initialState = {
    bottles: null,
    filtered: null,
    error: null,
    step: 1,
    bottleForm: {
      product: '',
      vintage: '',
      producer: '',
      region: '',
      country: null,
      varietal: null,
      style: null,
      sugar: null,
      bubbles: null,
      criticsScore: '',
      quantity: 1,
      currency: 'USD',
      price: 0,
      totalCost: 0,
      size: '',
      alcoholPct: '',
      vendor: '',
      location: '',
      datePurchased: null,
      dateReceived: null,
      opened: false,
      notes: '',
    },
  };

  const [state, dispatch] = useReducer(BottleReducer, initialState);

  // Get user's bottles
  const getBottles = async () => {
    try {
      const res = await axios.get('/api/bottles');

      dispatch({ type: GET_BOTTLES, payload: res.data });
    } catch (error) {
      dispatch({ type: BOTTLE_ERROR, payload: error.response });
    }
  };

  // Add bottle
  const addBottle = async (bottle) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/bottles', bottle, config);

      dispatch({ type: ADD_BOTTLE, payload: res.data });
    } catch (error) {
      dispatch({ type: BOTTLE_ERROR, payload: error.response });
    }
  };

  // Update bottle
  const updateBottle = async (bottle) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.put(`/api/bottles/${bottle._id}`, bottle, config);

      dispatch({ type: UPDATE_BOTTLE, payload: res.data });
    } catch (error) {
      dispatch({ type: BOTTLE_ERROR, payload: error.response.msg });
    }
  };

  // Delete bottle
  const deleteBottle = async (id) => {
    try {
      await axios.delete(`/api/bottles/${id}`);

      dispatch({ type: DELETE_BOTTLE, payload: id });
    } catch (error) {
      dispatch({ type: BOTTLE_ERROR, payload: error.response });
    }
  };

  // Clear bottles
  const clearBottles = () => {
    dispatch({ type: CLEAR_BOTTLES });
  };

  // Filter bottles
  const filterBottles = (text) => {
    dispatch({ type: FILTER_BOTTLES, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Increment step in bottle form
  const nextStep = () => {
    dispatch({ type: NEXT_STEP });
  };

  // Decrement step in bottle form
  const prevStep = () => {
    dispatch({ type: PREV_STEP });
  };

  // Change bottle form
  const changeForm = (key, value) => {
    dispatch({ type: CHANGE_FORM, payload: { key, value } });
  };

  // Clear form
  const clearForm = () => {
    dispatch({ type: CLEAR_FORM });
  };

  return (
    <BottleContext.Provider
      value={{
        bottles: state.bottles,
        filtered: state.filtered,
        error: state.error,
        step: state.step,
        bottleForm: state.bottleForm,
        getBottles,
        addBottle,
        deleteBottle,
        updateBottle,
        clearBottles,
        filterBottles,
        clearFilter,
        nextStep,
        prevStep,
        changeForm,
        clearForm,
      }}
    >
      {props.children}
    </BottleContext.Provider>
  );
};

export default BottleState;
