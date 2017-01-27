import actionCreatorFactory from 'typescript-fsa';

import { Shift, ShiftState } from 'shifts/types';
import { SubmitParams } from '../NewShiftModal';

const actionCreator = actionCreatorFactory('shiftplanning/shifts');

export const fetchAll = actionCreator.async<undefined, ShiftState, string>(
  'FETCH_ALL',
);

export const create = actionCreator.async<SubmitParams, Shift, string>(
  'CREATE',
);

export const update = actionCreator.async<Shift, undefined, string>('UPDATE');

export const remove = actionCreator.async<number, undefined, string>('REMOVE');
