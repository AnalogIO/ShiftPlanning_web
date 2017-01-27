import actionCreatorFactory from 'typescript-fsa';

import { TitleState } from 'titles/types';

const actionCreator = actionCreatorFactory('shiftplanning/titles');

export const fetchAll = actionCreator.async<any, TitleState, string>(
  'FETCH_ALL',
);
