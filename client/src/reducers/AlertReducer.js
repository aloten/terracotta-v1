import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = {
  loginAlerts: [],
  registerAlerts: [],
};

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      if (action.payload.type === 'login') {
        return {
          ...state,
          loginAlerts: [...state.loginAlerts, action.payload],
        };
      } else {
        return {
          ...state,
          registerAlerts: [...state.registerAlerts, action.payload],
        };
      }
    case REMOVE_ALERT:
      return {
        ...state,
        loginAlerts: state.loginAlerts.filter(
          (alert) => alert.id !== action.payload
        ),
        registerAlerts: state.registerAlerts.filter(
          (alert) => alert.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default AlertReducer;
