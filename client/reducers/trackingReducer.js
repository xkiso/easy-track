import * as types from '../actions/actionTypes';

const initialState = {
  trackingNumbers: {},
  display: {},
  inputTracking: '',
  inputLabel: '',
  inputCarrier: '',
};

const trackingReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.LOAD_TRACKINGS:
      return {
        ...state,
        trackingNumbers: action.payload
      };

    case types.ADD_TRACKING:
      let trackingNumbers = { ...state.trackingNumbers, ...action.payload }  
      return {
          ...state,
          trackingNumbers
        };

    case types.REMOVE_TRACKING:
      trackingNumbers = { ...state.trackingNumbers };
      delete trackingNumbers[action.payload];
      return {
          ...state,
          trackingNumbers
        };

    case types.PACKAGE_STATUS:
      console.log('case types.PACKAGE_STATUS', action.payload);
      let display = action.payload;
      return {
          ...state,
          display
        };

    case types.UPDATE_TRACKING:
      return {
          ...state,
          inputTracking: action.payload
        };

    case types.UPDATE_CARRIER:
      return {
          ...state,
          inputCarrier: action.payload
        };

    case types.UPDATE_LABEL:
      return {
          ...state,
          inputLabel: action.payload
        };

    default:
      return state;
  }
};

export default trackingReducer;
