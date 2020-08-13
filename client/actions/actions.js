import axios from 'axios';
import * as types from '../actions/actionTypes';

export const loadTrackings = () => (dispatch) => {
  axios.get('/tracking')
  .then(data => {
    dispatch({
      type: types.LOAD_TRACKINGS,
      payload: data.data.result.data,
    });
  })
  .catch(console.error);
};

export const addTracking = (event, trackingNumber, label, carrier) => dispatch => {
  event.preventDefault();
  axios.put(`/tracking?trackingNumber=${trackingNumber}&label=${label}&carrier=${carrier}`)
  .then(data => {
    dispatch({
      type: types.ADD_TRACKING,
      payload: {[trackingNumber]: {label, carrier}},
    });
  })
  .catch(console.error);
};

export const removeTracking = (trackingNumber) => dispatch => {
  axios.delete(`/tracking?trackingNumber=${trackingNumber}`)
  .then(data => {
    dispatch({
      type: types.REMOVE_TRACKING,
      payload: trackingNumber,
    });
  })
  .catch(console.error);
}

export const getPackageStatus = (trackingNumber, carrier) => dispatch => {
  axios.get(`/tracking?trackingNumber=${trackingNumber}&carrier=${carrier}`)
  .then(data => {
    dispatch({
      type: types.PACKAGE_STATUS,
      payload: data.data.result,
    });
  })
  .catch(console.error);
};

export const updateTracking = data => ({
  type: types.UPDATE_TRACKING,
  payload: data,
});

export const updateCarrier = data => ({
  type: types.UPDATE_CARRIER,
  payload: data,
});

export const updateLabel = data => ({
  type: types.UPDATE_LABEL,
  payload: data,
});