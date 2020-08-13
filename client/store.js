import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import trackingReducer from './reducers/trackingReducer';
import { loadTrackings } from './actions/actions';
import reducers from './reducers/index';

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.dispatch(loadTrackings());

export default store;