import { client } from 'api';
import { Title } from './types';

export const fetchTitles = async () => {
  const res = await client.get('/employeetitles');

  return res.data as Title[];
};
