import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as actions from './actions';

const INITIAL_STATE = {} as { [id: number]: { [id: number]: number } };

export default reducerWithInitialState(INITIAL_STATE).case(
  actions.fetchPreferences.done,
  (state, { params, result }) => ({ ...state, [params]: { ...result } }),
);
