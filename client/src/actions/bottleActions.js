import {
  GET_BOTTLES,
  ADD_BOTTLE,
  UPDATE_BOTTLE,
  DELETE_BOTTLE,
  BOTTLE_ERROR,
  CLEAR_FORM,
  CLEAR_BOTTLES,
  FILTER_BOTTLES,
  CLEAR_FILTER,
  OPEN_BOTTLE_FORM,
  CLOSE_BOTTLE_FORM,
  CHANGE_FORM_PROP,
} from './types';
import axios from 'axios';

// Get user's bottles
export const getBottles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/bottles');
    dispatch({ type: GET_BOTTLES, payload: res.data });
  } catch (error) {
    dispatch({ type: BOTTLE_ERROR, payload: error.response });
  }
};

// Add bottle
export const addBottle = (bottle) => async (dispatch) => {
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
export const updateBottle = (bottle) => async (dispatch) => {
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
export const deleteBottle = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/bottles/${id}`);

    dispatch({ type: DELETE_BOTTLE, payload: id });
  } catch (error) {
    dispatch({ type: BOTTLE_ERROR, payload: error.response });
  }
};

// Clear bottles
export const clearBottles = () => (dispatch) => {
  dispatch({ type: CLEAR_BOTTLES });
};

// Filter bottles
export const filterBottles = (text) => (dispatch) => {
  dispatch({ type: FILTER_BOTTLES, payload: text });
};

// Clear filter
export const clearFilter = () => (dispatch) => {
  dispatch({ type: CLEAR_FILTER });
};

// Set bottle form dialog to open
export const openBottleForm = () => (dispatch) => {
  dispatch({ type: OPEN_BOTTLE_FORM });
};

// Set bottle form dialog to close
export const closeBottleForm = () => (dispatch) => {
  dispatch({ type: CLOSE_BOTTLE_FORM });
};

// Change bottle form property
export const changeFormProp = (key, value) => (dispatch) => {
  dispatch({ type: CHANGE_FORM_PROP, payload: { key, value } });
};

// Clear form
export const clearForm = () => (dispatch) => {
  dispatch({ type: CLEAR_FORM });
};
