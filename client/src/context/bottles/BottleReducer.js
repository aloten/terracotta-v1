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

const BottleReducer = (state, action) => {
  switch (action.type) {
    case GET_BOTTLES:
      return {
        ...state,
        bottles: action.payload,
      };
    case ADD_BOTTLE:
      return {
        ...state,
        bottles: [action.payload, ...state.bottles],
      };
    case UPDATE_BOTTLE:
      return {
        ...state,
        bottles: state.bottles.map((bottle) =>
          bottle._id === action.payload._id ? action.payload : bottle
        ),
      };
    case DELETE_BOTTLE:
      return {
        ...state,
        bottles: state.bottles.filter(
          (bottle) => bottle._id !== action.payload
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case CLEAR_BOTTLES:
      return {
        ...state,
        bottles: null,
      };
    case FILTER_BOTTLES:
      return {
        ...state,
        filtered: state.bottles.filter((bottle) => {
          const regex = new RegExp(action.payload, 'gi');
          return (
            bottle.product.match(regex) ||
            bottle.vintage.match(regex) ||
            bottle.countryCode.match(regex) ||
            bottle.status.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case BOTTLE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default BottleReducer;
