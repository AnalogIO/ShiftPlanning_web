import actionCreatorFactory from 'typescript-fsa';

import { Schedule } from 'schedules/types';
import { ScheduledShift, ScheduledShiftState } from '../types';

const actionCreator = actionCreatorFactory('shiftplanning/scheduledShifts');

export const fetchAll = actionCreator.async<
  undefined,
  ScheduledShiftState,
  string
>('FETCH_ALL');

export const remove = actionCreator.async<
  {
    schedule: Schedule;
    scheduledShiftId: number;
  },
  undefined,
  string
>('REMOVE');

export const create = actionCreator.async<
  any, // TODO: figure out what this value is supposed to be
  {
    schedule: Schedule;
    scheduledShift: ScheduledShift;
  },
  string
>('CREATE');

export const update = actionCreator.async<
  {
    schedule: Schedule;
    scheduledShift: ScheduledShift;
  },
  undefined,
  string
>('UPDATE');
