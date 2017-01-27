import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { actions } from 'employees';
import { EmployeeState } from '../types';

const INITIAL_STATE = {} as EmployeeState;

export default reducerWithInitialState(INITIAL_STATE)
  .case(actions.fetchAll.done, (state, payload) => ({
    ...state,
    ...payload.result,
  }))
  .case(
    actions.create.done,
    (state, payload) =>
      !state.result
        ? state
        : {
            ...state,
            [payload.result.id]: payload.result,
            result: state.result.concat(payload.result.id),
          },
  )
  .case(actions.update.done, (state, payload) => ({
    ...state,
    [payload.result.id]: payload.result,
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
  .build();
