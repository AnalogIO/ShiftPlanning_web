import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as schedules from 'schedules';
import { GetState } from 'shared/types';

const thunk = (dispatch: Dispatch<any>, getState: GetState) => {
  const state = getState();

  if (!state.app.currentUser) {
    return;
  }

  if (state.schedules.result) {
    return;
  }

  dispatch(schedules.thunks.fetchAll());
};

const actionCreator = actionCreatorFactory('shiftplanning/preferences/routes');

export const overview = actionCreator('OVERVIEW');
export const update = actionCreator('UPDATE');

export const paths = {
  [overview.type]: {
    path: '/preferences',
    thunk,
  },
  [update.type]: {
    path: '/preferences/:scheduleId',
    thunk,
  },
};
