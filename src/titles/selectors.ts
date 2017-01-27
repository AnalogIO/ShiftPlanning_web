import { RootState } from 'shared/types';

export const getTitles = ({ titles }: RootState) =>
  titles.result ? titles.result.map(r => titles[r]) : [];

export const hasFetchedTitles = ({ titles }: RootState) => !!titles.result;
