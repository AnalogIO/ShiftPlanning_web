import { createSelector } from 'reselect';

import { Employee } from 'employees/types';
import { Maybe, RootState } from 'shared/types';

export const employeesSelector = (state: RootState) => state.employees;
const byIdSelector = (state: RootState, id: number): Maybe<Employee> =>
  employeesSelector(state)[id];

export const getEmployees = createSelector(
  employeesSelector,
  employees =>
    employees.result ? employees.result.map(r => employees[r]) : [],
);

export const getById = createSelector(byIdSelector, employee => employee);

export const hasFetchedEmployees = createSelector(
  employeesSelector,
  employees => !!employees.result,
);
