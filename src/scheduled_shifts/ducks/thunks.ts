import { normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { actions, api } from 'scheduled_shifts';
import { Schedule } from 'schedules/types';
import { scheduledShiftSchema } from 'schemas';
import { RootState } from 'shared/types';

export const create = (scheduleId: number, data: any) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState,
) => {
  const { schedules: scheduleList } = getState();
  const schedule = scheduleList[scheduleId];

  if (!schedule) {
    return;
  }

  try {
    const res = await api.create(scheduleId, data);

    const { result, entities: { scheduledShifts } } = normalize(
      res,
      scheduledShiftSchema,
    );

    const scheduledShift = scheduledShifts[result];

    dispatch(
      actions.create.done({
        params: data,
        result: { schedule, scheduledShift },
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

export const update = (scheduleId: number, scheduledShift: any) => async (
  dispatch: Dispatch<any>,
  getState: () => RootState,
) => {
  const { schedules: scheduleList } = getState();
  const schedule = scheduleList[scheduleId];

  const params = { schedule, scheduledShift };

  dispatch(actions.update.started(params));

  try {
    if (!schedule) {
      return;
    }

    api.update(scheduleId, scheduledShift);

    dispatch(
      actions.update.done({
        params,
        result: undefined,
      }),
    );
  } catch (e) {
    dispatch(
      actions.update.failed({
        params,
        error: e.response.data.message,
      }),
    );
  }
};

export const remove = (schedule: Schedule, scheduledShiftId: number) => async (
  dispatch: Dispatch<any>,
) => {
  if (!schedule) {
    return;
  }

  const params = { schedule, scheduledShiftId };

  try {
    await api.remove(schedule.id, scheduledShiftId);

    dispatch(
      actions.remove.done({
        params,
        result: undefined,
      }),
    );
    dispatch(push(`/schedules/${schedule.id}`));
  } catch (e) {
    dispatch(
      actions.remove.failed({
        params,
        error: e.response.data.message,
      }),
    );
  }
};
