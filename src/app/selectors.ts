import { RootState } from 'shared/types';

export const getCurrentUser = (state: RootState) => {
  return state.app.currentUser;
};

export const getFriends = ({ app, employees }: RootState) => {
  return app.currentUser!.friendshipIds.map(id => employees[id]);
};
