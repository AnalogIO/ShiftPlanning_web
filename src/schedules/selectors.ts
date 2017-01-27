import { denormalize } from 'normalizr';

import { scheduleSchema } from 'schemas';
import { RootState } from 'shared/types';

export const getSchedules = ({
  employees,
  scheduledShifts,
  schedules,
}: RootState) => {
  if (!schedules.result) {
    return [];
  }

  return schedules.result.map(id => {
    const entities = { employees, scheduledShifts };

    return denormalize(schedules[id], scheduleSchema, entities);
  });
};

export const hasFetchedSchedules = ({ schedules }: RootState) =>
  !!schedules.result;

export const getScheduleById = (
  { employees, scheduledShifts, schedules }: RootState,
  id: number,
) => {
  const entities = { employees, scheduledShifts };

  return denormalize(schedules[id], scheduleSchema, entities);
};
