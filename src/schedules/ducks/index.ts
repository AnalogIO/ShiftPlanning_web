import { reducerWithInitialState } from 'typescript-fsa-reducers';

import * as scheduledShifts from 'scheduled_shifts';
import { actions } from 'schedules';
import { ScheduleState } from '../types';

const INITIAL_STATE = {} as ScheduleState;

export default reducerWithInitialState(INITIAL_STATE)
  .case(actions.fetchAll.done, (state, { result }) => result)
  .case(actions.create.done, (state, { result }) => ({
    ...state,
    [result.id]: result,
    result: state.result!.concat(result.id),
  }))
  .case(scheduledShifts.actions.create.done, (state, { result }) => ({
    ...state,
    [result.schedule.id]: {
      ...result.schedule,
      scheduledShifts: result.schedule.scheduledShifts.concat(
        result.scheduledShift.id,
      ),
    },
  }))
  .case(actions.remove.done, (state, payload) => {
    const { [payload.result]: omit, result, ...rest } = state;

    if (!result) {
      return state;
    }

    const updatedResult = result.filter(r => r !== omit.id);

    return {
      ...rest,
      result: updatedResult,
    };
  })
  .case(scheduledShifts.actions.remove.done, (state, payload) => {
    const { schedule, scheduledShiftId } = payload.params;

    const scheduledShiftList = schedule.scheduledShifts.filter(
      ss => ss !== scheduledShiftId,
    );

    return {
      ...state,
      [schedule.id]: {
        ...schedule,
        scheduledShifts: scheduledShiftList,
      },
    };
  })
  .case(actions.generateOptimalSchedule.done, (state, { params, result }) => ({
    ...state,
    [params]: result.schedule,
  }));
