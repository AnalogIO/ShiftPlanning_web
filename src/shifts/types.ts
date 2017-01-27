import { CheckIn, Employee } from 'employees/types';
import { dateIsoString, State } from 'shared/types';

export type ShiftState = State<Shift>;

export interface Shift {
  id: number;
  end: dateIsoString;
  start: dateIsoString;
  employees: number[];
  checkIns: CheckIn[];
  title: string;
}

export interface ShiftDto {
  id: number;
  end: dateIsoString;
  start: dateIsoString;
  employees: Employee[];
  checkIns: CheckIn[];
  title: string;
}
