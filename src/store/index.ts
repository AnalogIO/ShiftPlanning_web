// This is necessary because of Redux devtools
declare var window: any;

import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, compose, createStore, Dispatch } from 'redux';
import { connectRoutes } from 'redux-first-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// TODO: be more selective about picking routes/paths
import { client } from 'api';
import * as app from 'app';
import { createReducers } from 'duck';
import * as employees from 'employees';
import { auth, sure, toast } from 'middlewares';
import * as preferences from 'preferences';
import * as schedules from 'schedules';
import { GetState } from 'shared/types';
import * as shifts from 'shifts';

export const history = createHistory();

const routes = {
  ...app.routes.paths,
  ...employees.routes.paths,
  ...schedules.routes.paths,
  ...preferences.routes.paths,
  ...shifts.routes.paths,
};

const {
  reducer: rudyReducer,
  middleware: rudyMiddleware,
  enhancer: rudyEnhancer,
} = connectRoutes(history, routes, {
  onBeforeChange: (dispatch: Dispatch<any>, getState: GetState) => {
    if (!getState().app.currentUser) {
      dispatch({ type: '@@APP_INIT' });
    }
  },
});

const middlewares = [sure, auth(client), rudyMiddleware, thunk, toast];

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger({
    predicate: (getState, action) => action.type.startsWith('shiftplanning'),
  });

  middlewares.push(logger);
}

export const store = createStore(
  createReducers(rudyReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(rudyEnhancer, applyMiddleware(...middlewares)),
);
