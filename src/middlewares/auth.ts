import { actions, routes as appRoutes } from 'app';
import { routes as schedulesRoutes } from 'schedules';
import { AxiosInstance } from 'axios';
import { redirect } from 'redux-first-router';

const LOCAL_STORAGE_STRING = 'organization';

/**
 * This middleware has three roles:
 *   Check if user is already signed in with an unexpired token.
 *   Save user to local storage when signing in (+ inject token in API client).
 *   Remove user from local storage when signing out.
 */

export default (client: AxiosInstance) => (store: any) => (next: any) => (
  action: any,
) => {
  if (action.type === '@@APP_INIT') {
    const organization = localStorage.getItem(LOCAL_STORAGE_STRING);

    if (!organization) {
      return next(action);
    }

    const org = JSON.parse(organization);

    const expired = new Date(org.expiresWhen) < new Date();

    if (!expired) {
      store.dispatch(
        actions.login.done({
          params: undefined,
          result: org,
        }),
      );
    }
  }

  if (action.type === actions.login.done.type) {
    const { result: organization } = action.payload;

    client.defaults.headers.common.Authorization = organization.token;

    localStorage.setItem(LOCAL_STORAGE_STRING, JSON.stringify(organization));

    const state = store.getState();

    if (state.location.type === appRoutes.login.type) {
      document.location.assign('/schedules');
    }

    if (action.meta && action.meta.trigger) {
      store.dispatch({ type: state.location.type });

      return;
    }
  }

  if (action.type === actions.logout.type) {
    localStorage.removeItem(LOCAL_STORAGE_STRING);
  }

  return next(action);
};
