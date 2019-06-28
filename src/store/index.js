import { createStore, applyMiddleware, combineReducers } from 'redux';

import reducers from '../reducers';
import initialState from '../reducers/initialState';

import middlewares from '../middlewares';

const store = createStore(
  combineReducers({
    ...reducers
  }),
  initialState,
  applyMiddleware(...middlewares)
);

export default store;