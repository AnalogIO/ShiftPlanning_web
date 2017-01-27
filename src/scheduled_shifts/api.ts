import { client } from 'api';
import { ScheduledShiftDto } from './types';

export const update = (
  scheduleId: number,
  scheduledShift: ScheduledShiftDto,
) => {
  return client.put(
    `/schedules/${scheduleId}/${scheduledShift.id}`,
    scheduledShift,
  );
};

export const remove = async (scheduleId: number, scheduledShiftId: number) => {
  return client.delete(`/schedules/${scheduleId}/${scheduledShiftId}`);
};

export const create = async (
  scheduleId: number,
  scheduledShift: ScheduledShiftDto,
) => {
  const res = await client.post(`/schedules/${scheduleId}`, scheduledShift);

  return res.data as ScheduledShiftDto;
};
