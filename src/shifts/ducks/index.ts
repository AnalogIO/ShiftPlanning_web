import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { actions } from 'shifts';
import { ShiftState } from 'shifts/types';

const INITIAL_STATE = {} as ShiftState;

export default reducerWithInitialState(INITIAL_STATE)
  .case(actions.fetchAll.done, (state, payload) => payload.result)
  .case(actions.update.done, (state, payload) => ({
    ...state,
    [payload.params.id]: payload.params,
  }))
  .case(actions.remove.done, (state, payload) => {
    const { [payload.params]: omit, result, ...rest } = state;

    if (!result) {
      return state;
    }

    return {
      ...rest,
      result: result.filter(r => r !== omit.id),
    };
  })
  .case(actions.create.done, (state, payload) => ({
    ...state,
    [payload.result.id]: payload.result,
    result: state.result
      ? state.result.concat(payload.result.id)
      : state.result,
  }));
