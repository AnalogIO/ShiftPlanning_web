import { Employee, EmployeeState } from '../types';

import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('shiftplanning/employees');

export const fetchAll = actionCreator.async<undefined, EmployeeState, string>(
  'FETCH_ALL',
);

export const create = actionCreator.async<Employee, Employee, string>('CREATE');

export const update = actionCreator.async<Employee, Employee, string>('UPDATE');

export const remove = actionCreator.async<number, undefined, string>('REMOVE');
