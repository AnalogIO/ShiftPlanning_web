import { createSelector } from 'reselect';

import { RootState } from 'shared/types';

const titlesSelector = (state: RootState) => state.titles;

export const getTitles = createSelector(
  titlesSelector,
  titles => (titles.result ? titles.result.map(r => titles[r]) : []),
);

export const hasFetchedTitles = createSelector(
  titlesSelector,
  titles => !!titles.result,
);
