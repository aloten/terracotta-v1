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
} from '../actions/types';

const initialState = {
  bottles: null,
  cellarStats: {
    wineInCellar: 0,
    winePending: 0,
    wineConsumed: 0,
    winePurchased: 0,
    readyToDrink: 0,
    totalValue: 0,
  },
  filtered: null,
  error: null,
  bottleFormOpen: false,
  bottleForm: {
    _id: null,
    product: '',
    vintage: '',
    producer: '',
    region: '',
    country: '',
    varietal: '',
    style: '',
    sugar: '',
    bubbles: '',
    criticsScore: '',
    quantity: 1,
    currency: 'USD',
    price: 0,
    totalCost: 0,
    size: '',
    alcoholPct: '',
    vendor: '',
    location: '',
    datePurchased: '',
    dateReceived: '',
    opened: false,
    notes: '',
  },
};

const BottleReducer = (state = initialState, action) => {
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
          country: '',
          varietal: '',
          style: '',
          sugar: '',
          bubbles: '',
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
    case LOAD_CELLAR_STATS:
      return {
        ...state,
        cellarStats: {
          ...state.cellarStats,
          wineInCellar: action.payload._wineInCellar,
          winePending: action.payload._winePending,
          winePurchased: action.payload._winePurchased,
          totalValue: action.payload._totalValue,
        },
      };
    default:
      return state;
  }
};

export default BottleReducer;
