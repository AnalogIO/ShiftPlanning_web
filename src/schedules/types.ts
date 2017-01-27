import { ScheduledShiftDto } from 'scheduled_shifts/types';
import { State } from 'shared/types';

export type ScheduleState = State<Schedule>;

export interface ScheduleDto {
  id: number;
  name: string;
  numberOfWeeks: number;
  scheduledShifts: ScheduledShiftDto[];
}

export interface Schedule {
  id: number;
  name: string;
  numberOfWeeks: number;
  scheduledShifts: number[];
}
