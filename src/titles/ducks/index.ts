import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { actions } from 'titles';
import { TitleState } from 'titles/types';

const INITIAL_STATE = {} as TitleState;

export default (state = INITIAL_STATE, action: Action): TitleState => {
  if (isType(action, actions.fetchAll.done)) {
    return { ...action.payload.result };
  }

  return state;
};
