import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('shiftplanning/app/routes');

export const home = actionCreator('HOME');
export const login = actionCreator('LOGIN');
export const logout = actionCreator('LOGOUT');

export const paths = {
  [home.type]: '/',
  [login.type]: '/login',
  [logout.type]: '/logout',
};
