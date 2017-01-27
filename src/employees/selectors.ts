import { RootState } from 'shared/types';

export const getEmployees = ({ employees }: RootState) => {
  return employees.result ? employees.result.map(r => employees[r]) : [];
};

export const hasFetchedEmployees = ({ employees }: RootState) => {
  return !!employees.result;
};
