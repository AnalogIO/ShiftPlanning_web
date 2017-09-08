import { denormalize } from 'normalizr';
import { createSelector } from 'reselect';

import { selectors as employeesSelectors } from 'employees';
import { shiftSchema } from 'schemas';
import { RootState } from 'shared/types';
import { ShiftDto } from './types';

const shiftsSelector = (state: RootState) => state.shifts;

export const getShifts = createSelector(
  shiftsSelector,
  shifts => (shifts.result ? shifts.result.map(r => shifts[r]) : []),
);

export const hasFetchedShifts = createSelector(
  shiftsSelector,
  shifts => !!shifts.result,
);

export const getShiftsAsCalendarEvents = createSelector(
  shiftsSelector,
  employeesSelectors.employeesSelector,
  employeesSelectors.hasFetchedEmployees,
  hasFetchedShifts,
  (shiftsState, employeesState, employeesFetched, shiftsFetched) => {
    if (!employeesFetched || !shiftsFetched) {
      return [];
    }

    const shifts = denormalize(shiftsState.result, [shiftSchema], {
      employees: employeesState,
      shifts: shiftsState,
    }) as ShiftDto[];

    return shifts.map(s => ({
      ...s,
      title: s.employees.map(e => e.firstName).join(', '),
    }));
  },
);
