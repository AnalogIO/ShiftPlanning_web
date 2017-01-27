import actionCreatorFactory from 'typescript-fsa';

import { ScheduledShift } from 'scheduled_shifts/types';
import { Schedule, ScheduleDto, ScheduleState } from '../types';

type ScheduleId = number;

const actionCreator = actionCreatorFactory('shiftplanning/schedules');

export const fetchAll = actionCreator.async<undefined, ScheduleState, string>(
  'FETCH_ALL',
);

export const create = actionCreator.async<ScheduleDto, Schedule, string>(
  'CREATE',
);

export const remove = actionCreator.async<ScheduleId, number, string>('REMOVE');

export const rollout = actionCreator.async<ScheduleId, undefined, string>(
  'ROLLOUT',
);

export const generateOptimalSchedule = actionCreator.async<
  number,
  { schedule: Schedule; scheduledShifts: { [id: number]: ScheduledShift } },
  string
>('GENERATE_OPTIMAL_SCHEDULE');
