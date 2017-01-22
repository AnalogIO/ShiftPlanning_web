import { createHash } from 'crypto';
import { observable, computed, action } from 'mobx';
import * as _ from 'lodash';
import client, { setAuthorizationToken } from 'api';

export interface IManager {
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
  @action async login(username: string, password: string): Promise<IManager> {
    username = username.trim();
    password = createHash('sha256').update(password).digest('base64');

    const res = await client.post('/manager/login', { username, password });
    const manager = res.data as IManager;

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

export type IEmployee = any;
export type IEmployeeTitle = any;

class EmployeeStore {
  @observable employees: IEmployee[] = [];
  @observable titles: IEmployeeTitle[] = [];

  getEmployee(id: number): IEmployee | null {
    const employee = _.find(this.employees, (e) => e.id == id);

    // `find` returns the value or undefined but by returning null instead we
    // can get strictNullChecks
    return employee ? employee : null;
  }

  @action async getTitles() {
    const res = await client.get('/employeetitles');
    this.titles = res.data as IEmployeeTitle[];
  }

  @action async getEmployees() {
    const res = await client.get('/employees')
    const data = res.data as IEmployee[];
    const employees = _.sortBy(data, ['firstName', 'lastName']);
    this.employees = employees as IEmployee[];
  }

  async createEmployee(employee: IEmployee) {
    const res = await client.post('/employees', employee);

    this.employees.unshift(res.data);

    return res.data;
  }

  async updateEmployee(employee: IEmployee) {
    return client.put(`/employees/${employee.id}`, employee);
  }

  async deleteEmployee(employee: IEmployee) {
    const res = await client.delete(`/employees/${employee.id}`);

    _.remove(this.employees, (e) => e.id == employee.id);

    return res.data;
  }
}

export type ISchedule = any;
export type IShift = any;
export type IScheduleId = number;
export type IScheduledShiftId = number;

class ScheduleStore {
  @observable schedules = [] as ISchedule[];

  getById(id: number): ISchedule | null {
    return _.find(this.schedules, (s) => id == s.id) || null;
  }

  @action async getSchedules() {
    const res = await client.get('/schedules');

    this.schedules = res.data as ISchedule[];
    return this.schedules;
  }

  @action async newSchedule(s: ISchedule) {
    const res = await client.post(`/schedules`, s);

    this.schedules.push(res.data);

    return res.data;
  }

  @action async deleteSchedule(s: ISchedule) {
    const res = await client.delete(`/schedules/${s.id}`);

    _.remove(this.schedules, ['id', s.id]);

    return res.data;
  }

  @action async newShift(id: IScheduleId, s: IShift) {
    // there is a bug here
    // for some reason id is a string
    id = parseInt(String(id));
    const res = await client.post(`/schedules/${id}`, s);

    const schedule = _.find(this.schedules, ['id', id]);
    schedule.scheduledShifts.push(s);

    return res.data;
  }

  @action async updateShift(id: IScheduleId, sid: IScheduledShiftId, s: IShift) {
    const res = await client.put(`/schedules/${id}/${sid}`, s);

    const schedule = _.find(this.schedules, ['id', id]);
    const shiftIndex = _.findIndex(schedule.scheduledShifts, (s: IShift) => s.id == sid);
    _.set(schedule.scheduledShifts, shiftIndex, s);

    return res.data;
  }

  @action async deleteShift(id: IScheduleId, sid: IScheduledShiftId) {
    const res = await client.delete(`/schedules/${id}/${sid}`);

    const schedule = _.find(this.schedules, ['id', id]);
    _.remove(schedule.scheduledShifts, (s: IShift) => s.id == sid);

    return res.data;
  }

  async rollout(schedule: ISchedule, range: { from: string, to: string }) {
    const res = await client.post(`/schedules/${schedule.id}/rollout`, range);
    console.log(res.data);

    return res.data;
  }
}

const stores = {
  AuthStore: new AuthStore(),
  EmployeeStore: new EmployeeStore(),
  ScheduleStore: new ScheduleStore(),
};

export default stores;
