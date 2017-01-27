import { AppState } from 'app/types';
import { EmployeeState } from 'employees/types';
import { ScheduledShiftState } from 'scheduled_shifts/types';
import { ScheduleState } from 'schedules/types';
import { ShiftState } from 'shifts/types';
import { TitleState } from 'titles/types';

export type Maybe<T> = undefined | T;

export type dateIsoString = string;

export interface Option {
  id: number;
  title: string;
}

export interface VerticalMenuItem<T> {
  title: string;
  subtitle: string;
  active: boolean;
  key?: string | number;
  link: string;
  data: T;
}

export interface State<T> {
  [id: number]: T;
  result: Maybe<number[]>;
}

export interface RootState {
  app: AppState;
  employees: EmployeeState;
  schedules: ScheduleState;
  scheduledShifts: ScheduledShiftState;
  shifts: ShiftState;
  titles: TitleState;
  form: any; // redux-form
}
