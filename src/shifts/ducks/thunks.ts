import { normalize } from 'normalizr';
import { Dispatch } from 'redux';

import { shiftSchema } from 'schemas';
import { actions, api } from 'shifts';
import { SubmitParams } from '../NewShiftModal';
import { Shift, ShiftDto } from '../types';

export const fetchAll = () => async (dispatch: Dispatch<any>) => {
  const params = undefined;

  try {
    const res = await api.fetchAll();

    const shiftsData = res.map(s => ({
      ...s,
      title: s.employees.map(e => e.firstName).join(', '),
    }));

    const { result, entities: { shifts: shiftList } } = normalize(shiftsData, [
      shiftSchema,
    ]);

    dispatch(
      actions.fetchAll.done({ params, result: { result, ...shiftList } }),
    );
  } catch (e) {
    dispatch(
      actions.fetchAll.failed({
        params,
        error: e.response.data.message,
      }),
    );
  }
};

export const create = (data: SubmitParams) => async (
  dispatch: Dispatch<any>,
) => {
  dispatch(actions.create.started(data));

  try {
    const shiftDto = await api.create(data);

    const { result: id, entities } = normalize(shiftDto, shiftSchema);

    const shift = entities.shifts[id] as Shift;

    dispatch(
      actions.create.done({
        params: data,
        result: shift,
      }),
    );
  } catch (e) {
    dispatch(
      actions.create.failed({
        params: data,
        error: e.response.data.message,
      }),
    );
  }
};

export const update = (dto: ShiftDto) => async (dispatch: Dispatch<any>) => {
  const { result: id, entities } = normalize(dto, shiftSchema);

  const shift = entities.shifts[id];

  dispatch(actions.update.started(shift));

  try {
    const result = await api.update(dto);

    dispatch(
      actions.update.done({
        params: shift,
        result,
      }),
    );
  } catch (e) {
    dispatch(
      actions.update.failed({
        params: shift,
        error: e.response.data.message,
      }),
    );
  }
};

export const remove = (id: number) => async (dispatch: Dispatch<any>) => {
  if (!dispatch(actions.remove.started(id))) {
    return;
  }

  try {
    const result = await api.remove(id);

    dispatch(
      actions.remove.done({
        params: id,
        result,
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
