import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as employees from 'employees';
import { GetState } from 'shared/types';
import * as shifts from 'shifts';

const thunk = (dispatch: Dispatch<any>, getState: GetState) => {
  const state = getState();

  if (!state.app.currentUser) {
    return;
  }

  if (state.employees.result && state.titles.result) {
    return;
  }

  dispatch(employees.thunks.fetchAll());
  dispatch(shifts.thunks.fetchAll());
};

const actionCreator = actionCreatorFactory('shiftplanning/shifts/routes');

export const overview = actionCreator('OVERVIEW');

export const paths = {
  [overview.type]: {
    path: '/shifts',
    thunk,
  },
};
