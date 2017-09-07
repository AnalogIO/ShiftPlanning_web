import { Employee } from 'employees/types';
import { Maybe, RootState } from 'shared/types';

export const getEmployees = ({ employees }: RootState) => {
  return employees.result ? employees.result.map(r => employees[r]) : [];
};

export const getById = (state: RootState, id: number): Maybe<Employee> =>
  state.employees[id];

export const hasFetchedEmployees = ({ employees }: RootState) => {
  return !!employees.result;
};
