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
    case CLEAR_FORM:
      return {
        ...state,
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
          return bottle.product.match(regex) || bottle.vintage.match(regex);
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
    case OPEN_BOTTLE_FORM:
      return {
        ...state,
        bottleFormOpen: true,
      };
    case CLOSE_BOTTLE_FORM:
      return {
        ...state,
        bottleFormOpen: false,
      };
    case CHANGE_FORM_PROP:
      return {
        ...state,
        bottleForm: {
          ...state.bottleForm,
          [action.payload.key]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default BottleReducer;
