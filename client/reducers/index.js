import { combineReducers } from 'redux';
import trackingReducer from './trackingReducer';

export default combineReducers({
  tracking: trackingReducer,
});