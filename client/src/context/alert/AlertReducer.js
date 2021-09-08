import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      if (action.payload.type === 'login') {
        return {...state, [...login, action.payload};
      } else if (action.payload.type === 'register') {
        return [...state, action.payload];
      }
      
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default AlertReducer;
