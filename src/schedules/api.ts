import { client } from 'api';
import { ScheduleDto } from './types';

export const fetchAll = async () => {
  const res = await client.get('/schedules');

  return res.data as ScheduleDto[];
};

export const create = async (schedule: ScheduleDto) => {
  const res = await client.post('/schedules', schedule);

  return res.data as ScheduleDto;
};

interface RolloutParams {
  from: string;
  to: string;
  startFromScheduledWeek: number;
}

export const rollout = async (scheduleId: number, params: RolloutParams) => {
  return await client.post(`/schedules/${scheduleId}/rollout`, params);
};

export const generateOptimalSchedule = async (id: number) => {
  const res = await client.post(`/schedules/${id}/findoptimal`);

  return res.data as ScheduleDto;
};
