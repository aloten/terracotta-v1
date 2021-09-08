import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      if (action.payload.type === 'login') {
        return {
          ...state,
          login: [...state.login, action.payload],
        };
      } else {
        return {
          ...state,
          register: [...state.register, action.payload],
        };
      }
    case REMOVE_ALERT:
      return {
        ...state,
        login: state.login.filter((alert) => alert.id !== action.payload),
        register: state.register.filter((alert) => alert.id !== action.payload),
      };
    default:
      return state;
  }
};

export default AlertReducer;
