import { denormalize } from 'normalizr';

import * as employees from 'employees';
import { shiftSchema } from 'schemas';
import { RootState } from 'shared/types';
import { ShiftDto } from './types';

export const getShifts = ({ shifts }: RootState) => {
  return shifts.result ? shifts.result.map(r => shifts[r]) : [];
};

export const hasFetchedShifts = ({ shifts }: RootState) => {
  return !!shifts.result;
};

export const getShiftsAsCalendarEvents = (state: RootState) => {
  if (
    !hasFetchedShifts(state) ||
    !employees.selectors.hasFetchedEmployees(state)
  ) {
    return [];
  }

  const shifts = denormalize(state.shifts.result, [shiftSchema], {
    employees: state.employees,
    shifts: state.shifts,
  }) as ShiftDto[];

  return shifts.map(s => ({
    ...s,
    title: s.employees.map(e => e.firstName).join(', '),
  }));
};
