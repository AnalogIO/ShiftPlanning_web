import { Dispatch } from 'redux';
import { redirect } from 'redux-first-router';

import { actions, routes } from 'app';

export const logout = () => (dispatch: Dispatch<any>) => {
  dispatch(actions.logout());
  dispatch((redirect as any)(routes.home()));
};
