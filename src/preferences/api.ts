import { client } from 'api';
import { Preference } from './types';

export const setPreferences = async (id: number, preferences: Preference[]) => {
  const res = await client.post(`/schedules/${id}/setpreferences`, preferences);

  return res;
};
