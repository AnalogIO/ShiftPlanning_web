// This is necessary because of Redux devtools
declare var window: any;

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { client } from 'api';
import { reducers } from 'duck';
import { auth, sure, toast } from 'middlewares';

export const history = createHistory();

const middlewares = [
  sure,
  auth(client),
  routerMiddleware(history),
  thunk,
  toast,
];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    predicate: (getState, action) => action.type.startsWith('shiftplanning'),
  });

  middlewares.push(logger);
}

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middlewares),
);
