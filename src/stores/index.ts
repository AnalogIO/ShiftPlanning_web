import { createHash } from 'crypto';
import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';
import client, { setAuthorizationToken } from 'api';

export interface Manager {
  token: string;
  organizationId: number;
  organizationName: string;
  expires: number;
  expiresDate?: string;
}

class AuthStore {
  @observable loggedIn = false;

  @computed get isAuthenticated(): boolean {
    const manager = JSON.parse(localStorage.getItem('manager'));

    if (manager && new Date() < new Date(manager.expiresDate)) {
      setAuthorizationToken(manager.token);
      return manager.token;
    }

    return this.loggedIn;
  }

  // This method expects password to be the plaintext: it will do the hashing
  @action async login(username: string, password: string): Promise<Manager> {
    username = username.trim();
    password = createHash('sha256').update(password).digest('base64');

    const res = await client.post('/manager/login', { username, password });
    const manager = res.data as Manager;

    // manager.expires is in seconds but Date.now() is in milliseconds
    manager.expiresDate = new Date(Date.now() + (manager.expires * 1000)).toISOString();
    localStorage.setItem('manager', JSON.stringify(manager));

    // This HAS to be set first:
    // otherwise components will be rendered before an Authorization token
    // has been set for all future requests!
    setAuthorizationToken(manager.token);
    this.loggedIn = true;

    return manager;
  }
};

export type Employee = any;
export type EmployeeTitle = any;

class EmployeeStore {
  @observable employees: Employee[] = [];
  @observable titles: EmployeeTitle[] = [];

  getEmployee(id: number): Employee | null {
    const employee = _.find(this.employees, (e: any) => e.id == id);

    // `find` returns the value or undefined but by returning null instead we
    // can get strictNullChecks
    return employee ? employee : null;
  }

  @action async getTitles() {
    const res = await client.get('/employeetitles');
    this.titles = res.data as EmployeeTitle[];
  }

  @action async getEmployees() {
    const res = await client.get('/employees')
    this.employees = res.data as Employee[];
  }

  async createEmployee(employee: Employee) {
    return client.post('/employees', employee);
  }

  async updateEmployee(employee: Employee) {
    return client.put(`/employees/${employee.id}`, employee);
  }
}

export type Schedule = any;
export type Shift = any;
export type ScheduleId = number;
export type ScheduleShiftId = number;

class ScheduleStore {
  @observable schedules = [] as Schedule[];

  getById(id: number): Schedule | null {
    return _.find(this.schedules, (s) => id == s.id) || null;
  }

  @action async getSchedules() {
    const res = await client.get('/schedules');

    this.schedules = res.data as Schedule[];
    return this.schedules;
  }

  @action async newShift(id: ScheduleId, s: Shift) {
    const res = await client.post(`/schedules/${id}`, s);

    return res.data;
  }

  @action async updateShift(id: ScheduleId, sid: ScheduleShiftId, s: Shift) {
    const res = await client.put(`/schedules/${id}/${sid}`, s);

    return res.data;
  }

  @action async deleteShift(id: ScheduleId, sid: ScheduleShiftId) {
    const res = await client.delete(`/schedules/${id}/${sid}`);

    return res.data;
  }
}

const stores = {
  AuthStore: new AuthStore(),
  EmployeeStore: new EmployeeStore(),
  ScheduleStore: new ScheduleStore(),
};

export default stores;
