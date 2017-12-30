import { Dispatch } from 'redux';

import { Preference } from '../types';
import * as actions from './actions';
import * as api from '../api';

export const fetchPreferences = (id: number) => async (
  dispatch: Dispatch<any>,
) => {
  const params = id;
  const res = await api.getPreferences(id);

  const result = res.reduce((acc: { [id: number]: number }, s: Preference) => {
    acc[s.scheduledShiftId] = s.priority;

    return acc;
  }, {});

  return dispatch(
    actions.fetchPreferences.done({
      params,
      result,
    }),
  );
};
