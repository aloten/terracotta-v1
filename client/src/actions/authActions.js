import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from './types';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/login');

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response.data.msg });
  }
};

// Register User
export const register = (formData) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await axios.post('/api/register', formData, config);

        dispatch({ type: REGISTER_SUCCESS, payload: res.data });

        resolve();
      } catch (error) {
        if (error.response.data.errors) {
          dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.errors[0].msg,
          });
        } else {
          dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
        }
      }
    });
  };
};

// Login User
export const login = (formData) => {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        const res = await axios.post('/api/login', formData, config);

        dispatch({ type: LOGIN_SUCCESS, payload: res.data });

        resolve();
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
      }
    });
  };
};

// Logout User
export const logout = () => (dispatch) => dispatch({ type: LOGOUT });

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
