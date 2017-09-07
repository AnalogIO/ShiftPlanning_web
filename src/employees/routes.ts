import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as employees from 'employees';
import { GetState } from 'shared/types';
import * as titles from 'titles';

const thunk = (dispatch: Dispatch<any>, getState: GetState) => {
  const state = getState();

  if (!state.app.currentUser) {
    return;
  }

  if (state.employees.result && state.titles.result) {
    return;
  }

  dispatch(employees.thunks.fetchAll());
  dispatch(titles.thunks.fetchAll());
};

const actionCreator = actionCreatorFactory('shiftplanning/employees/routes');

export const create = actionCreator('CREATE');
export const update = actionCreator('UPDATE');

export const paths = {
  [create.type]: {
    path: '/employees',
    thunk,
  },
  [update.type]: {
    path: '/employees/:employeeId',
    thunk,
  },
};
