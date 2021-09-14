import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// Set Alert
export const setAlert = (msg, type, timeout = 5000) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const id = uuidv4();
      dispatch({ type: SET_ALERT, payload: { msg, type, id } });
      resolve(id, timeout);
    });
  };
};

// Remove Alert after some time
export const removeAlert = (id, timeout) => (dispatch) => {
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
