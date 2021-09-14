import { combineReducers } from 'redux';
import BottleReducer from './BottleReducer';
import AuthReducer from './AuthReducer';
import AlertReducer from './AlertReducer';

export default combineReducers({
  bottleState: BottleReducer,
  authState: AuthReducer,
  alertState: AlertReducer,
});
