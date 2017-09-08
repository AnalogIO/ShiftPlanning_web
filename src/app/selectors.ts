import { createSelector } from 'reselect';

import { RootState } from 'shared/types';

const currentUserSelector = (state: RootState) => state.app.currentUser;
const employeesSelector = (state: RootState) => state.employees;

export const getCurrentUser = createSelector(
  currentUserSelector,
  currentUser => currentUser,
);

export const getFriends = createSelector(
  getCurrentUser,
  employeesSelector,
  (currentUser, employees) =>
    currentUser ? currentUser.friendshipIds.map(id => employees[id]) : [],
);
