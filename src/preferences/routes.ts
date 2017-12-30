import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as thunks from './ducks/thunks';
import * as schedules from 'schedules';
import { GetState } from 'shared/types';

const overviewThunk = (dispatch: Dispatch<any>, getState: GetState) => {
  dispatch(schedules.thunks.fetchAll());
};

const updateThunk = (dispatch: Dispatch<any>, getState: GetState) => {
  const state = getState();

  dispatch(schedules.thunks.fetchAll());
  dispatch(thunks.fetchPreferences(state.location.payload.scheduleId));
};

const actionCreator = actionCreatorFactory('shiftplanning/preferences/routes');

export const overview = actionCreator('OVERVIEW');
export const update = actionCreator('UPDATE');

export const paths = {
  [overview.type]: {
    path: '/preferences',
    thunk: overviewThunk,
  },
  [update.type]: {
    path: '/preferences/:scheduleId',
    thunk: updateThunk,
  },
};
