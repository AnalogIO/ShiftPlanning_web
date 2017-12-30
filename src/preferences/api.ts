import { client } from 'api';
import { Preference } from './types';

export const getPreferences = async (id: number) =>
  await client.get(`/schedules/${id}/preferences`).then(res => res.data);

export const setPreferences = async (id: number, preferences: Preference[]) =>
  await client.put(`/schedules/${id}/preferences`, preferences);
