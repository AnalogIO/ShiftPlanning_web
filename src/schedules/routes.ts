import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';

import * as employees from 'employees';
import * as schedules from 'schedules';
import { GetState } from 'shared/types';

const thunk = (dispatch: Dispatch<any>, getState: GetState) => {
  const state = getState();

  if (!state.app.currentUser) {
    return;
  }

  if (state.employees.result && state.schedules.result) {
    return;
  }

  dispatch(employees.thunks.fetchAll());
  dispatch(schedules.thunks.fetchAll());
};

const actionCreator = actionCreatorFactory('shiftplanning/schedules/routes');

export const create = actionCreator('CREATE');
export const update = actionCreator('UPDATE');
export const createScheduledShift = actionCreator('CREATE_SCHEDULED_SHIFT');
export const updateScheduledShift = actionCreator('UPDATE_SCHEDULED_SHIFT');
export const rollout = actionCreator('ROLLOUT');

export const paths = {
  [create.type]: {
    path: '/schedules',
    thunk,
  },
  [update.type]: {
    path: '/schedules/:scheduleId',
    thunk,
  },
  [createScheduledShift.type]: {
    path: '/schedules/:scheduleId/shifts/:day',
    thunk,
  },
  [updateScheduledShift.type]: {
    path: '/schedules/:scheduleId/shifts/:day/:scheduledShiftId',
    thunk,
  },
  [rollout.type]: {
    path: '/schedules/:scheduleId/rollout',
    thunk,
  },
};
