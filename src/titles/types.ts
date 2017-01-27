import { State } from 'shared/types';

export type TitleState = State<Title>;

export interface Title {
  id: number;
  title: string;
}
