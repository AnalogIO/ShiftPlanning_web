import { dateIsoString, State } from 'shared/types';

export type EmployeeState = State<Employee>;

export interface Employee {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  employeeTitle: string;
  employeeTitleId: number;
  active: boolean;
  photoRef: string;
  checkInCount: number;
}

export interface CheckIn {
  id: number;
  time: dateIsoString;
  employee: Employee;
}
