import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { actions } from 'app';
import { AppState } from '../types';

export const INITIAL_STATE: AppState = {
  loggingIn: false,
};

export default reducerWithInitialState(INITIAL_STATE)
  .case(actions.login.started, state => ({
    ...state,
    loggingIn: true,
  }))
  .case(actions.login.done, (state, payload) => ({
    ...state,
    currentUser: payload.result.employee,
    loggingIn: false,
  }))
  .case(actions.login.failed, state => ({
    ...state,
    currentUser: undefined,
    loggingIn: false,
  }))
  .case(actions.logout, state => ({
    ...state,
    currentUser: undefined,
    loggingIn: false,
  }));
