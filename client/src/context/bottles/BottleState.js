import React, { useReducer } from 'react';
import BottleContext from './BottleContext';
import BottleReducer from './BottleReducer';
import {
  GET_BOTTLES,
  ADD_BOTTLE,
  UPDATE_BOTTLE,
  DELETE_BOTTLE,
  BOTTLE_ERROR,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_BOTTLES,
  FILTER_BOTTLES,
  CLEAR_FILTER,
} from '../types';
import axios from 'axios';

const BottleState = (props) => {
  const initialState = {
    bottles: null,
    filtered: null,
    current: null,
    error: null,
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

  // Set current
  const setCurrent = (bottle) => {
    dispatch({ type: SET_CURRENT, payload: bottle });
  };

  // Clear current
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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

  return (
    <BottleContext.Provider
      value={{
        bottles: state.bottles,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getBottles,
        addBottle,
        deleteBottle,
        updateBottle,
        setCurrent,
        clearCurrent,
        clearBottles,
        filterBottles,
        clearFilter,
      }}
    >
      {props.children}
    </BottleContext.Provider>
  );
};

export default BottleState;
