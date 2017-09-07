import { normalize } from 'normalizr';
import { Dispatch } from 'redux';

import { actions, api } from 'employees';
import { employeeSchema } from 'schemas';
import errorHandler from 'shared/errors/handler';
import { Employee } from '../types';

export const fetchAll = () => async (dispatch: Dispatch<any>) => {
  dispatch(actions.fetchAll.started(undefined));

  try {
    const employeesData = await api.getEmployees();

    const { result, entities: { employees } } = normalize(employeesData, [
      employeeSchema,
    ]);

    dispatch(
      actions.fetchAll.done({
        params: undefined,
        result: { result, ...employees },
      }),
    );
  } catch (e) {
    dispatch(
      actions.fetchAll.failed({
        params: undefined,
        error: errorHandler(e, 10000),
      }),
    );
  }
};

export const create = (employee: Employee) => async (
  dispatch: Dispatch<any>,
) => {
  dispatch(actions.create.started(employee));

  try {
    const result = await api.createEmployee(employee);

    dispatch(
      actions.create.done({
        params: employee,
        result,
      }),
    );
  } catch (e) {
    dispatch(
      actions.create.failed({
        params: employee,
        error: e.response.data.message,
      }),
    );
  }
};

export const update = (employee: Employee) => async (
  dispatch: Dispatch<any>,
) => {
  dispatch(actions.update.started(employee));

  try {
    await api.update(employee);

    dispatch(
      actions.update.done({
        params: employee,
        result: employee,
      }),
    );
  } catch (e) {
    dispatch(
      actions.update.failed({
        params: employee,
        error: e.response.data.message,
      }),
    );
  }
};

export const remove = (id: number) => async (dispatch: Dispatch<any>) => {
  if (
    !dispatch(
      actions.remove.started(id, {
        sure:
          'This will also remove all shifts belonging to that employee! Are you sure?',
      }),
    )
  ) {
    return;
  }

  try {
    await api.remove(id);

    dispatch(
      actions.remove.done({
        params: id,
        result: undefined,
      }),
    );
  } catch (e) {
    dispatch(
      actions.remove.failed({
        params: id,
        error: e.response.data.message,
      }),
    );
  }
};
