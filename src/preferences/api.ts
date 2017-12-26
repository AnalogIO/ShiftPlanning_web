import { client } from 'api';
import { Preference } from './types';

export const setPreferences = async (id: number, preferences: Preference[]) => {
  const res = await client.put(`/schedules/${id}/preferences`, preferences);

  return res;
};
