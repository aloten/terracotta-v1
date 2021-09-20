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
  LOAD_CELLAR_STATS,
} from './types';
import axios from 'axios';

// Get user's bottles
export const getBottles = () => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get('/api/bottles');
        dispatch({ type: GET_BOTTLES, payload: res.data });
        resolve();
      } catch (error) {
        dispatch({ type: BOTTLE_ERROR, payload: error.response });
      }
    });
  };
};

// Add bottle
export const addBottle = (bottle) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await axios.post('/api/bottles', bottle, config);
        dispatch({ type: ADD_BOTTLE, payload: res.data });
        resolve();
      } catch (error) {
        dispatch({ type: BOTTLE_ERROR, payload: error.response });
      }
    });
  };
};

// Update bottle
export const updateBottle = (bottle) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const res = await axios.put(
          `/api/bottles/${bottle._id}`,
          bottle,
          config
        );

        dispatch({ type: UPDATE_BOTTLE, payload: res.data });
        resolve();
      } catch (error) {
        dispatch({ type: BOTTLE_ERROR, payload: error.response.msg });
      }
    });
  };
};

// Delete bottle
export const deleteBottle = (id) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.delete(`/api/bottles/${id}`);

        dispatch({ type: DELETE_BOTTLE, payload: id });
        resolve();
      } catch (error) {
        dispatch({ type: BOTTLE_ERROR, payload: error.response });
      }
    });
  };
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

// Load cellar stats based on get bottles request response
export const loadCellarStats = () => (dispatch, getState) => {
  const bottles = getState().bottleState.bottles;

  let _wineInCellar = 0;
  let _winePending = 0;
  // let _wineConsumed = 0;
  let _winePurchased = 0;
  // let _readyToDrink = 0;
  let _totalValue = 0;

  if (bottles) {
    bottles.forEach((bottle) => {
      if (bottle.quantity) {
        _winePurchased += bottle.quantity;
      }
      if (bottle.dateReceived === null) {
        _winePending += bottle.quantity;
      }
      if (bottle.totalCost) {
        _totalValue += bottle.totalCost;
      }
    });
    _wineInCellar = _winePurchased - _winePending;
    dispatch({
      type: LOAD_CELLAR_STATS,
      payload: { _wineInCellar, _winePending, _winePurchased, _totalValue },
    });
  }
};
