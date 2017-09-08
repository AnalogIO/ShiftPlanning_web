import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { scheduleSchema } from 'schemas';
import { Schedule } from 'schedules/types';
import { Maybe, RootState } from 'shared/types';

const employeesSelector = (state: RootState) => state.employees;
const schedulesSelector = (state: RootState) => state.schedules;
const scheduledShiftsSelector = (state: RootState) => state.scheduledShifts;

export const getSchedules = createSelector(
  employeesSelector,
  schedulesSelector,
  scheduledShiftsSelector,
  (employees, schedules, scheduledShifts) => {
    if (!schedules.result) {
      return [];
    }

    return schedules.result.map(id => {
      const entities = { employees, scheduledShifts };

      return denormalize(schedules[id], scheduleSchema, entities);
    });
  },
);

export const hasFetchedSchedules = createSelector(
  schedulesSelector,
  schedules => !!schedules.result,
);

const byIdSelector = (state: RootState, id: number): Maybe<Schedule> =>
  schedulesSelector(state)[id];

export const getById = createSelector(
  employeesSelector,
  scheduledShiftsSelector,
  byIdSelector,
  (employees, scheduledShifts, schedule) => {
    const entities = { employees, scheduledShifts };

    return denormalize(schedule, scheduleSchema, entities);
  },
);
