import { Employee } from 'employees/types';
import { State } from 'shared/types';

export type ScheduledShiftState = State<ScheduledShift>;

export interface ScheduledShiftDto {
  id: number;
  day: number;
  start: string;
  end: string;
  employees: Employee[];
  lockedEmployeeIds: number[];
}

export interface ScheduledShift {
  id: number;
  day: number;
  start: string;
  end: string;
  employees: number[];
  lockedEmployeeIds: number[];
}
