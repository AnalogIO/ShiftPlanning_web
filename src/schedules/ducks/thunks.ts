import { normalize } from 'normalizr';
import { push } from 'react-router-redux';
import { Dispatch } from 'redux';

import { client } from 'api';
import * as scheduledShifts from 'scheduled_shifts';
import { ScheduledShift } from 'scheduled_shifts/types';
import { actions, api } from 'schedules';
import { scheduleSchema } from 'schemas';
import { Schedule, ScheduleDto } from '../types';

export const fetchAll = () => async (dispatch: Dispatch<any>) => {
  const params = undefined;

  try {
    const res = await api.fetchAll();

    const {
      result,
      entities: {
        schedules: scheduleList,
        scheduledShifts: scheduledShiftList,
      },
    } = normalize(res, [scheduleSchema]);

    const scheduledShiftsResult = Object.keys(scheduledShiftList);

    dispatch(
      scheduledShifts.actions.fetchAll.done({
        params,
        result: {
          result: scheduledShiftsResult,
          ...scheduledShiftList,
        },
      }),
    );
    dispatch(
      actions.fetchAll.done({
        params,
        result: {
          result,
          ...scheduleList,
        },
      }),
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

export const create = (schedule: ScheduleDto) => async (
  dispatch: Dispatch<any>,
) => {
  const res = await api.create(schedule);

  const { result, entities: { schedules: scheduleList } } = normalize(
    res,
    scheduleSchema,
  );

  dispatch(
    actions.create.done({
      params: schedule,
      result: scheduleList[result],
    }),
  );
};

export const remove = (id: number) => async (dispatch: Dispatch<any>) => {
  try {
    await client.delete(`/schedules/${id}`);

    dispatch(
      actions.remove.done({
        params: id,
        result: id,
      }),
    );
    dispatch(push('/schedules'));
  } catch (e) {
    dispatch(
      actions.remove.failed({
        params: id,
        error: (e.response && e.response.data.message) || e.message,
      }),
    );
  }
};

export const rollout = (
  scheduleId: number,
  from: string,
  to: string,
  startFromScheduledWeek: number,
) => {
  return async (dispatch: Dispatch<any>) => {
    const params = {
      from,
      to,
      startFromScheduledWeek,
    };

    dispatch(actions.rollout.started(scheduleId));

    try {
      await api.rollout(scheduleId, params);

      dispatch(
        actions.rollout.done({
          params: scheduleId,
          result: undefined,
        }),
      );
    } catch (e) {
      dispatch(
        actions.rollout.failed({
          params: scheduleId,
          error: e.response.data.message,
        }),
      );
    }
  };
};

export const generateOptimalSchedule = (id: number) => async (
  dispatch: Dispatch<any>,
) => {
  const params = id;

  try {
    const scheduleDto = await api.generateOptimalSchedule(id);

    const {
      result,
      entities: {
        schedules: scheduleList,
        scheduledShifts: scheduledShiftList,
      },
    } = normalize(scheduleDto, scheduleSchema);

    const schedule = scheduleList[result] as Schedule;
    const shifts = scheduledShiftList as ScheduledShift[];

    dispatch(
      actions.generateOptimalSchedule.done({
        params,
        result: { schedule, scheduledShifts: shifts },
      }),
    );
  } catch (e) {
    dispatch(
      actions.generateOptimalSchedule.failed({
        params,
        error: e.response.data.message,
      }),
    );
  }
};
