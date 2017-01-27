import { client } from 'api';
import { SubmitParams } from './NewShiftModal';
import { ShiftDto } from './types';

export const fetchAll = async () => {
  const res = await client.get('/shifts');

  return res.data as ShiftDto[];
};

export const create = async ({ start, end, employees }: SubmitParams) => {
  const data = { start, end, employeeIds: employees.map(e => e.id) };

  const res = await client.post('/shifts', data);

  return res.data as ShiftDto;
};

export const update = async ({ id, start, end, employees }: ShiftDto) => {
  const data = { start, end, employeeIds: employees.map(e => e.id) };

  await client.put(`/shifts/${id}`, data);

  return undefined;
};

export const remove = async (id: number) => {
  await client.delete(`/shifts/${id}`);

  return undefined;
};
