import actionCreatorFactory from 'typescript-fsa';

import { Preference } from '../types';

const actionCreator = actionCreatorFactory('shiftplanning/preferences');

export const fetchPreferences = actionCreator.async<
  number,
  { [id: number]: number },
  string
>('FETCH_PREFERENCES');

export const updatePreferences = actionCreator.async<
  number,
  { [id: number]: number },
  string
>('UPDATE_PREFERENCES');
