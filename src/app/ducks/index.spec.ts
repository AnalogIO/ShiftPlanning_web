import reducer, { INITIAL_STATE } from '.';
import * as actions from './actions';

describe('app', () => {
  describe('sign in', () => {
    it('starts', () => {
      const params = undefined;

      const action = actions.login.started(params);

      expect(action).toEqual({ type: 'shiftplanning/app/LOGIN_STARTED' });
      expect(reducer(INITIAL_STATE, action)).toMatchSnapshot();
    });

    it('is done', () => {
      const params = undefined;

      const result = {
        organizationName: 'Analog',
        organizationId: 1,
        token: 'abc123',
        expires: 60 * 60 * 24,
        expiresWhen: new Date(),
        employee: {
          active: true,
          checkInCount: 0,
          email: 'test@example.com',
          employeeTitle: 'Barista',
          employeeTitleId: 1,
          firstName: 'John',
          friendshipIds: [],
          id: 1,
          lastName: 'Doe',
          photoRef: '',
          roles: 0,
          wantShifts: 1,
        },
      };

      const action = actions.login.done({
        params,
        result,
      });

      expect(action).toEqual({
        type: 'shiftplanning/app/LOGIN_DONE',
        payload: {
          params,
          result,
        },
      });
      expect(reducer(INITIAL_STATE, action)).toMatchSnapshot();
    });

    it('failed', () => {
      const params = undefined;

      const error = 'Wrong username/password';

      const action = actions.login.failed({
        params,
        error,
      });

      expect(action).toEqual({
        type: 'shiftplanning/app/LOGIN_FAILED',
        error: true,
        payload: {
          params,
          error,
        },
      });
      expect(reducer(INITIAL_STATE, action)).toMatchSnapshot();
    });
  });

  describe('sign out', () => {
    it('is done', () => {
      const action = actions.logout();

      expect(action).toEqual({
        type: 'shiftplanning/app/LOGOUT',
      });
      expect(reducer(INITIAL_STATE, action)).toMatchSnapshot();
    });
  });
});
