import { createHash } from 'crypto';
import { observable, computed, action } from 'mobx';
import client, { setAuthorizationToken } from 'api';

export interface Manager {
  token: string;
  organizationId: number;
  organizationName: string;
}

class AuthStore {
  @observable manager: Manager = { token: '', organizationId: 0, organizationName: '' };

  @computed get isAuthenticated(): boolean {
    return !!this.manager.token;
  }

  // This method expects password to be the plaintext: it will do the hashing
  @action async login(username: string, password: string): Promise<Manager> {
    password = createHash('sha256').update(password).digest('base64');

    const res = await client.post('/manager/login', { username, password });
    const manager = res.data as Manager;

    // This HAS to be set first:
    // otherwise components will be rendered before an Authorization token
    // has been set for all future requests!
    setAuthorizationToken(manager.token);
    this.manager = manager;

    return manager;
  }
};

export type Employee = any;

class EmployeeStore {
  @observable employees: Employee[] = [];

  @action async getEmployees() {
    const res = await client.get('/employees')
    this.employees = res.data as Employee[];
  }
}

const stores = {
  AuthStore: new AuthStore(),
  EmployeeStore: new EmployeeStore(),
};

export default stores;
