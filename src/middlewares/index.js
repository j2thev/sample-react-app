import { routerMiddleware } from 'react-router-redux';

import logger from 'redux-logger';

import history from '../utils/history';

// import testMiddleware from './testMiddleware';

const middlewares = [
  // testMiddleware,
  logger,
  routerMiddleware(history)
];

export default middlewares;