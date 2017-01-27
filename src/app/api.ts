import { createHash } from 'crypto';

import { client } from 'api';
import { Role } from 'routes';
import { LoginData, ManagerLogin } from './types';

export const login = async (manager: ManagerLogin) => {
  const username = manager.email.trim();
  const password = createHash('sha256')
    .update(manager.password)
    .digest('base64');

  const res = await client.post('/employees/login', { username, password });

  const organization = res.data as LoginData;

  organization.expiresWhen = new Date(organization.expires * 1000 + Date.now());

  const roles = (organization as any).employee.roles as (keyof typeof Role)[];
  organization.employee.roles = roles
    .map(r => Role[r])
    .reduce((acc, r) => acc | r, 0);

  return organization;
};
