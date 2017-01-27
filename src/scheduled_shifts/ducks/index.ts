import { Action } from 'redux';
import { isType } from 'typescript-fsa';

import { actions } from 'scheduled_shifts';
import * as schedules from 'schedules';
import { ScheduledShiftState } from '../types';

const INITIAL_STATE = {} as ScheduledShiftState;

export default (state = INITIAL_STATE, action: Action): ScheduledShiftState => {
  if (isType(action, actions.fetchAll.done)) {
    return action.payload.result;
  }

  if (isType(action, actions.create.done)) {
    if (!state.result) {
      return state;
    }

    const { scheduledShift } = action.payload.result;

    return {
      ...state,
      [scheduledShift.id]: scheduledShift,
      result: state.result.concat(scheduledShift.id),
    };
  }

  if (isType(action, actions.update.done)) {
    return {
      ...state,
      [action.payload.params.scheduledShift.id]:
        action.payload.params.scheduledShift,
    };
  }

  if (isType(action, actions.remove.done)) {
    const {
      [action.payload.params.scheduledShiftId]: omit,
      result,
      ...rest,
    } = state;

    if (!result) {
      return state;
    }

    const updatedResult = result.filter(r => r !== omit.id);

    return {
      ...rest,
      result: updatedResult,
    };
  }

  if (isType(action, schedules.actions.generateOptimalSchedule.done)) {
    return {
      ...state,
      ...action.payload.result.scheduledShifts,
    };
  }

  return state;
};
