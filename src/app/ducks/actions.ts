import actionCreatorFactory from 'typescript-fsa';

import { LoginData } from '../types';

const actionCreator = actionCreatorFactory('shiftplanning/app');

export const login = actionCreator.async<undefined, LoginData, string>('LOGIN');

export const logout = actionCreator('LOGOUT');
